import { Server } from 'socket.io';
import { supabase } from '../../lib/supabaseClient';

let io;

async function readSiteStatus() {
  const { data, error } = await supabase
    .from('site_status')
    .select('down')
    .single();

  if (error && error.code === 'PGRST116') { // No rows found
    // Initialize the table if it's empty
    await writeSiteStatus(false);
    return false;
  } else if (error) {
    console.error('Error reading site status from Supabase:', error);
    return false; // Default to site not down on error
  }
  return data.down;
}

async function writeSiteStatus(value) {
  const { data, error } = await supabase
    .from('site_status')
    .upsert({ id: 1, down: value }, { onConflict: 'id' });

  if (error) {
    console.error('Error writing site status to Supabase:', error);
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
