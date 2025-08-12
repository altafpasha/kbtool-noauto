import { sendResumeSignal } from './socket';

export default function handler(req, res) {
  sendResumeSignal();
  res.status(200).json({ message: 'Resume signal sent' });
}
