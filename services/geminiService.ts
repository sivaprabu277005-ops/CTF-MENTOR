import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from '../constants';

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables.");
    return;
  }
  client = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const createChatSession = (): Chat => {
  if (!client) initializeGemini();
  if (!client) throw new Error("Failed to initialize Gemini Client");

  chatSession = client.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // Balance between creativity and precision
      topK: 40,
      topP: 0.95,
    }
  });

  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    createChatSession();
  }
  
  if (!chatSession) throw new Error("Chat session could not be created");

  try {
    const resultStream = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
       yield chunk.text;
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
