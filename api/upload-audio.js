import { put } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const blob = await req.blob();
  const { url } = await put(`testimonies/${Date.now()}.wav`, blob, {
    access: "public",
  });

  return new Response(JSON.stringify({ url }), {
    headers: { "Content-Type": "application/json" },
  });
}
