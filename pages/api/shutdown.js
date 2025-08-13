import { sendShutdownSignal, setSiteDownFlag } from './socket';

export default function handler(req, res) {
  setSiteDownFlag(true); // Set "down" flag for middleware
  sendShutdownSignal();  // Kick active users instantly
  res.status(200).json({ message: 'Site shutdown activated' });
}
