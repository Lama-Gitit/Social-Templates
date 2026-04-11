async function apiFetch(url: string, body: object) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
