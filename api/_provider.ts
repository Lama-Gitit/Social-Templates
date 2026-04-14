import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";

type Provider = "gemini" | "anthropic";

// Default provider is Anthropic (Claude). Set AI_PROVIDER=gemini to switch back.
const provider: Provider = (process.env.AI_PROVIDER as Provider) || "anthropic";

const anthropicClient = provider === "anthropic" ? new Anthropic() : null;
const geminiClient = provider === "gemini"
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
    : null;

async function claudeCall(prompt: string, maxTokens: number): Promise<string> {
    const response = await anthropicClient!.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
    });
    if (response.stop_reason === "max_tokens") {
        throw new Error(
            `Claude response was truncated (max_tokens ${maxTokens} hit). ` +
            `Increase max_tokens or shorten the prompt.`
        );
    }
    const block = response.content.find(
        (b): b is Anthropic.TextBlock => b.type === "text"
    );
    if (!block) throw new Error("No text response from Claude");
    return block.text;
}

function stripMarkdownFences(text: string): string {
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }
    return cleaned;
}

export async function generateText(prompt: string): Promise<string> {
    if (provider === "anthropic") {
        return claudeCall(prompt, 2048);
    }

    const model = geminiClient!.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export async function generateJSON(prompt: string): Promise<unknown> {
    if (provider === "anthropic") {
        const text = await claudeCall(prompt, 8192);
        const cleaned = stripMarkdownFences(text);
        try {
            return JSON.parse(cleaned);
        } catch (e) {
            const reason = e instanceof Error ? e.message : String(e);
            throw new Error(`Claude returned invalid JSON: ${reason}`);
        }
    }

    const model = geminiClient!.getGenerativeModel({
        model: "gemini-flash-latest",
        generationConfig: { responseMimeType: "application/json" },
    });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
}
