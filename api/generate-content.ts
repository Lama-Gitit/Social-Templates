import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateText } from "./_provider.js";
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

    const { prompt, platform } = req.body;
    if (!prompt || !platform) {
        return res.status(400).json({ error: "Missing prompt or platform" });
    }

    try {
        const fullPrompt = `You are an expert social media manager. Write a ${platform} post about: ${prompt}.
    Keep it engaging, relevant to the platform's style (hashtags for Instagram/Twitter, professional for LinkedIn),
    and concise.`;

        const text = await generateText(fullPrompt);
        return res.status(200).json({ text });
    } catch (error) {
        const info = error instanceof Error
            ? { name: error.name, message: error.message, stack: error.stack }
            : error;
        console.error("generate-content error:", info);
        const message = error instanceof Error ? error.message : "Failed to generate content";
        return res.status(500).json({ error: message });
    }
}
