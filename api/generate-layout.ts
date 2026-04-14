import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateJSON } from "./_provider.js";
import { checkAuth } from "./_auth.js";
import { checkRateLimit } from "./_rate-limit.js";

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
        const info = error instanceof Error
            ? { name: error.name, message: error.message, stack: error.stack }
            : error;
        console.error("generate-layout error:", info);
        const message = error instanceof Error ? error.message : "Failed to generate layout";
        return res.status(500).json({ error: message });
    }
}
