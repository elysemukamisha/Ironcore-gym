import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ChatMessage } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGymResponse = async (history: ChatMessage[], userMessage: string): Promise<string> => {
  try {
    // Convert internal chat format to Gemini format
    // Map 'assistant' role to 'model' for the API
    const historyContents = history
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

    // Add the current new user message to the end
    const contents = [
      ...historyContents,
      {
        role: "user",
        parts: [{ text: userMessage }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Efficient for chat
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 300, // Increased slightly to allow for full summary
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I'm having trouble connecting to the server right now. Please call us directly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble processing your request at the moment.";
  }
};
