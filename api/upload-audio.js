export const config = {
  runtime: "nodejs",
};

import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const file = req.body; // frontend sends file as base64 string
      const buffer = Buffer.from(file, "base64");

      const blob = await put(`audio-${Date.now()}.webm`, buffer, {
        access: "public",
      });

      res.status(200).json({ url: blob.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
