import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";

type Provider = "gemini" | "anthropic";

const provider: Provider = (process.env.AI_PROVIDER as Provider) || "gemini";

const anthropicClient = provider === "anthropic" ? new Anthropic() : null;
const geminiClient = provider === "gemini"
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
    : null;

export async function generateText(prompt: string): Promise<string> {
    if (provider === "anthropic") {
        const response = await anthropicClient!.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }],
        });
        const block = response.content.find(
            (b): b is Anthropic.TextBlock => b.type === "text"
        );
        if (!block) throw new Error("No text response from Claude");
        return block.text;
    }

    const model = geminiClient!.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export async function generateJSON(prompt: string): Promise<unknown> {
    if (provider === "anthropic") {
        const text = await generateText(prompt);
        let cleaned = text.trim();
        if (cleaned.startsWith("```")) {
            cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
        }
        return JSON.parse(cleaned);
    }

    const model = geminiClient!.getGenerativeModel({
        model: "gemini-flash-latest",
        generationConfig: { responseMimeType: "application/json" },
    });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
}
