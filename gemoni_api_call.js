import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing from your .env file');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function gemini_api_call(user_query) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: user_query,
    });

    return response.text || 'No response generated.';
}
