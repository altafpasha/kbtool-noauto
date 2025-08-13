import { Server } from 'socket.io';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SITE_STATUS_FILE = path.join(DATA_DIR, 'site-status.json');

let io;

async function readSiteStatus() {
  try {
    const data = await fs.readFile(SITE_STATUS_FILE, 'utf8');
    return JSON.parse(data).siteDown;
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, initialize it
      await writeSiteStatus(false);
      return false;
    }
    console.error('Error reading site status file:', error);
    return false; // Default to site not down on error
  }
}

async function writeSiteStatus(value) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SITE_STATUS_FILE, JSON.stringify({ siteDown: value }), 'utf8');
  } catch (error) {
    console.error('Error writing site status file:', error);
  }
}

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('🔌 Initializing Socket.io server...');
    io = new Server(res.socket.server, {
      path: '/api/socket_io',
      cors: { origin: '*' }
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
    });

    res.socket.server.io = io;
  }
  res.end();
}

export function sendShutdownSignal() {
  if (io) {
    io.emit('shutdown');
    console.log('🚨 Sent shutdown signal to all clients');
  }
}

export function sendResumeSignal() {
  if (io) {
    io.emit('resume');
    console.log('✅ Sent resume signal to all clients');
  }
}

export async function setSiteDownFlag(value) {
  await writeSiteStatus(value);
}

export async function isSiteDown() {
  return await readSiteStatus();
}
