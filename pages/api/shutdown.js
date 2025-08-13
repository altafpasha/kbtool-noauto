import { sendShutdownSignal, setSiteDownFlag } from './socket';

export default async function handler(req, res) {
  await setSiteDownFlag(true); // Set "down" flag for middleware
  sendShutdownSignal();  // Kick active users instantly
  res.status(200).json({ message: 'Site shutdown activated' });
}
