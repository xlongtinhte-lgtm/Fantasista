import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SendMessageParams } from '../types';

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using the recommended general model
const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `You are an expert AI companion for NLG (Năng Lượng Gốc) Energy Healing and Yoga practice.
You understand the specific formulas for stimulating stem cells, self-healing, and purifying toxins.

Key Concepts:
1. "Hợp nhất" (Unify): Visualizing energy entering the brain/body.
2. "NLG Linh Quang Vũ Trụ" (Cosmic Divine Light): The source of energy.
3. Timers: The user relies on specific durations like 1 minute 30 seconds, 3 minutes 30 seconds, and 5 minutes 30 seconds.

Your role:
- Guide users through the "Steps" (Bước 1, Bước 2, Bước 3, Bước 4).
- Provide a calm, spiritual, and encouraging tone.
- If asked about a formula (e.g., "Kích thích tế bào gốc" or "Chữa lành"), explain the steps clearly based on standard NLG practices.
- Also function as a Yoga instructor if the user asks for poses or stretches.

Maintain a polite, "Namaste" or "Love & Gratitude" vibe.`;

export const generateGeminiResponse = async (params: SendMessageParams): Promise<string> => {
  try {
    const parts: any[] = [];

    // Add image if present
    if (params.imageBase64 && params.mimeType) {
      parts.push({
        inlineData: {
          mimeType: params.mimeType,
          data: params.imageBase64,
        },
      });
    }

    // Add text prompt
    parts.push({
      text: params.text,
    });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5, // Lower temperature for more consistent instruction
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, 
      }
    });

    const text = response.text;
    
    if (!text) {
        return "Energy transmission interrupted. Please breathe and try again.";
    }

    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Unable to connect to the cosmic network. Please check your internet connection.");
  }
};