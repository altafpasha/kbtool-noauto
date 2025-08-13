import { sendResumeSignal, setSiteDownFlag } from './socket';

export default async function handler(req, res) {
  await setSiteDownFlag(false); // Remove "down" flag
  sendResumeSignal();     // Tell open tabs to reload
  res.redirect(302, '/');
}
