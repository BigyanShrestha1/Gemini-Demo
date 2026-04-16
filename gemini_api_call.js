import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function gemini_api_call(user_query) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.0-flash',
            contents: user_query,
        });

        return response.text || 'No response generated.';
    } catch (error) {
        console.error('Gemini API failed:', error);
        throw error;
    }
}