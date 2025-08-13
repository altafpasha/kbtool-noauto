// pages/api/shutdown.js
import { sendShutdownSignal } from './socket';

export default function handler(req, res) {
  const AUTH_PASSWORD = process.env.ADMIN_SECRET || "myStrongPassword123";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (token !== AUTH_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Your logic to enable maintenance mode here
  global.maintenanceMode = true;
  sendShutdownSignal(); // Kick active users instantly

  res.status(200).json({ message: "Site is now in maintenance mode" });
}
