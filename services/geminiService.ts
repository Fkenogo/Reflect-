
import { GoogleGenAI, Type } from "@google/genai";
import { Book, ChatMessage, StudyMode } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export interface AIResponse {
  text: string;
  metadata: {
    detected_feelings: string[];
    detected_themes: string[];
    linked_principles: string[];
    should_log: boolean;
  };
}

export const generateResponse = async (
  message: string,
  history: ChatMessage[],
  books: Book[],
  mode: StudyMode
): Promise<AIResponse> => {
  // Always initialize with named parameter and process.env.API_KEY right before use.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const formattedHistory = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content }]
  }));

  const modeInstruction = `\nTHE CURRENT ACTIVE MODE IS: ${mode.toUpperCase()}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...formattedHistory.slice(-10), 
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + modeInstruction,
      temperature: 0.3,
      topP: 0.9,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          metadata: {
            type: Type.OBJECT,
            properties: {
              detected_feelings: { type: Type.ARRAY, items: { type: Type.STRING } },
              detected_themes: { type: Type.ARRAY, items: { type: Type.STRING } },
              linked_principles: { type: Type.ARRAY, items: { type: Type.STRING } },
              should_log: { type: Type.BOOLEAN }
            },
            required: ["detected_feelings", "detected_themes", "linked_principles", "should_log"]
          }
        },
        required: ["text", "metadata"]
      }
    },
  });

  try {
    const json = JSON.parse(response.text);
    return json as AIResponse;
  } catch (e) {
    return {
      text: response.text || "I am staying with this observation. What else do you notice?",
      metadata: {
        detected_feelings: [],
        detected_themes: [],
        linked_principles: [],
        should_log: false
      }
    };
  }
};
