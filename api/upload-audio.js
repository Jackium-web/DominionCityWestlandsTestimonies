export const config = {
  runtime: "nodejs18.x", // Force Node.js runtime, not Edge
};

import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Convert request body into a buffer
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      // Save blob to Vercel Blob Storage
      const blob = await put(`uploads/${Date.now()}.wav`, fileBuffer, {
        access: "public",
      });

      return res.status(200).json({ url: blob.url });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Upload failed" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
