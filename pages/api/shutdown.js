import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
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
