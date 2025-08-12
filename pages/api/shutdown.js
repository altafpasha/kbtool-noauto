import { sendShutdownSignal } from './socket';

export default function handler(req, res) {
  sendShutdownSignal();
  res.status(200).json({ message: 'Shutdown signal sent' });
}
