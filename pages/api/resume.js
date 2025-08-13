import { sendResumeSignal, setSiteDownFlag } from './socket';

export default async function handler(req, res) {
  await setSiteDownFlag(false); // Remove "down" flag
  sendResumeSignal();     // Tell open tabs to reload
  res.status(200).json({ message: 'Site resumed' });
}
