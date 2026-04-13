let _aiToken = '';

export function setAIToken(token: string) {
    _aiToken = token;
}

async function apiFetch(url: string, body: object) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (_aiToken) {
        headers["Authorization"] = `Bearer ${_aiToken}`;
    }

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || "Request failed");
    }

    return res.json();
}

export async function generateSocialContent(prompt: string, platform: string) {
    const data = await apiFetch("/api/generate-content", { prompt, platform });
    return data.text;
}

export async function generateLayoutJSON(prompt: string) {
    return apiFetch("/api/generate-layout", { prompt });
}
