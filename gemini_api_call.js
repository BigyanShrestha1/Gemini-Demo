import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function gemini_api_call(user_query) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: user_query,
        });

        return response.text || 'No response generated.';
    } catch (error) {
        console.error('Gemini API failed:', error);
        throw error;
    }
}