// import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SendMessageParams } from '../types';

// NOTE: This service is disabled for the static deployment version to prevent build errors
// related to process.env.API_KEY. The app is currently running in "Formula Mode".

export const generateGeminiResponse = async (params: SendMessageParams): Promise<string> => {
  console.log("AI Service is disabled in this version.");
  return "AI Service is currently disabled. Please use the Formula Library.";
  
  /* 
  // Original code kept for reference:
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const MODEL_NAME = 'gemini-2.5-flash';
  
  try {
    const parts: any[] = [];
    if (params.imageBase64 && params.mimeType) {
      parts.push({
        inlineData: {
          mimeType: params.mimeType,
          data: params.imageBase64,
        },
      });
    }
    parts.push({ text: params.text });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
    });

    return response.text || "No response";
  } catch (error) {
    throw error;
  }
  */
};