import { sendShutdownSignal, setSiteDownFlag } from './socket';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await setSiteDownFlag(true); // Set "down" flag for middleware
  sendShutdownSignal();  // Kick active users instantly
  res.status(200).json({ message: 'Site shutdown activated' });
}
