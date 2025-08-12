import { sendResumeSignal, setSiteDownFlag } from './socket';

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  setSiteDownFlag(false); // Remove "down" flag
  sendResumeSignal();     // Tell open tabs to reload
  res.status(200).json({ message: 'Site resumed' });
}
