import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Missing VITE_GEMINI_API_KEY in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function generateSocialContent(prompt: string, platform: string) {
    if (!API_KEY) {
        throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    try {
        const fullPrompt = `You are an expert social media manager. Write a ${platform} post about: ${prompt}. 
    Keep it engaging, relevant to the platform's style (hashtags for Instagram/Twitter, professional for LinkedIn), 
    and concise.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}

export async function generateLayoutJSON(prompt: string) {
    if (!API_KEY) {
        throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    try {
        const jsonModel = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await jsonModel.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
    } catch (error) {
        console.error("Error generating layout JSON:", error);
        throw error;
    }
}
