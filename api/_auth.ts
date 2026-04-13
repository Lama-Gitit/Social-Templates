import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Validates the Bearer token against the AI_ACCESS_TOKEN env var.
 * Returns null if authorized, or a 401 response if not.
 */
export function checkAuth(req: VercelRequest, res: VercelResponse): VercelResponse | null {
    const token = process.env.AI_ACCESS_TOKEN;

    // If no token is configured, block all requests (fail closed)
    if (!token) {
        return res.status(503).json({ error: "AI features are not configured" });
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const provided = authHeader.slice(7);

    // Constant-time comparison to prevent timing attacks
    if (provided.length !== token.length) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let mismatch = 0;
    for (let i = 0; i < token.length; i++) {
        mismatch |= provided.charCodeAt(i) ^ token.charCodeAt(i);
    }

    if (mismatch !== 0) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    return null;
}
