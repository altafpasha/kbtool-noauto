import { sendResumeSignal, setSiteDownFlag } from './socket';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${serverRuntimeConfig.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  setSiteDownFlag(false); // Remove "down" flag
  sendResumeSignal();     // Tell open tabs to reload
  res.status(200).json({ message: 'Site resumed' });
}
