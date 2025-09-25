import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { file } = req.body;
            if (!file) return res.status(400).json({ error: "No file provided" });

            // Decode base64
            const buffer = Buffer.from(file, "base64");

            // Save to /tmp folder (Vercel only allows /tmp for writing)
            const filename = `testimony-${Date.now()}.wav`;
            const filepath = path.join("/tmp", filename);
            await fs.promises.writeFile(filepath, buffer);

            // Return temporary URL
            // ⚠️ Note: /tmp is ephemeral; for permanent storage, integrate S3, Cloudinary, etc.
            res.status(200).json({ success: true, url: `https://your-site.vercel.app/api/tmp/${filename}` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to upload audio" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
