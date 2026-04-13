import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateJSON } from "./_provider";
import { checkAuth } from "./_auth";
import { checkRateLimit } from "./_rate-limit";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const unauthorized = checkAuth(req, res);
    if (unauthorized) return unauthorized;

    const limited = checkRateLimit(req, res);
    if (limited) return limited;

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "Missing prompt" });
    }

    try {
        const data = await generateJSON(prompt);
        return res.status(200).json(data);
    } catch (error) {
        console.error("generate-layout error:", error);
        return res.status(500).json({ error: "Failed to generate layout" });
    }
}
