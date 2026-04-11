import type { VercelRequest, VercelResponse } from "@vercel/node";

interface RateEntry {
    timestamps: number[];
}

const store = new Map<string, RateEntry>();
let lastCleanup = Date.now();

function getIP(req: VercelRequest): string {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
    return req.socket?.remoteAddress || "unknown";
}

/**
 * Returns null if allowed, or a VercelResponse if rate-limited.
 * Limits: 2 requests/minute, 10 requests/day per IP.
 */
export function checkRateLimit(req: VercelRequest, res: VercelResponse): VercelResponse | null {
    const ip = getIP(req);
    const now = Date.now();

    // Inline cleanup every 5 minutes
    if (now - lastCleanup > 300_000) {
        lastCleanup = now;
        const cutoff = now - 86_400_000;
        for (const [key, entry] of store) {
            entry.timestamps = entry.timestamps.filter(t => t > cutoff);
            if (entry.timestamps.length === 0) store.delete(key);
        }
    }

    if (!store.has(ip)) {
        store.set(ip, { timestamps: [] });
    }
    const entry = store.get(ip)!;

    // Single pass: prune stale timestamps and count recent ones
    const dayAgo = now - 86_400_000;
    const minuteAgo = now - 60_000;
    let recentCount = 0;
    const valid: number[] = [];
    for (const t of entry.timestamps) {
        if (t <= dayAgo) continue;
        valid.push(t);
        if (t > minuteAgo) recentCount++;
    }
    entry.timestamps = valid;

    if (recentCount >= 2) {
        return res.status(429).json({
            error: "Too many requests. Max 2 per minute.",
        });
    }

    if (valid.length >= 10) {
        return res.status(429).json({
            error: "Daily limit reached. Max 10 per day.",
        });
    }

    entry.timestamps.push(now);
    return null;
}
