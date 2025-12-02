import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from '../constants';

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = () => {
  let apiKey: string | undefined;
  
  try {
    // Safely access process.env to avoid ReferenceError in browsers where process is not defined
    apiKey = process.env.API_KEY;
  } catch (e) {
    // process is not defined, apiKey remains undefined
    console.warn("Unable to access process.env");
  }

  // Fallback if env var is missing (User provided key)
  if (!apiKey) {
    apiKey = "AIzaSyDcuBF4GzD4fjG__RBtNRv_rHDK83eK-tU";
  }

  // Explicitly check for the API key to provide a better error message
  if (!apiKey) {
    throw new Error("API_KEY is missing. Please set it in your environment variables.");
  }
  
  client = new GoogleGenAI({ apiKey });
};

export const createChatSession = (): Chat => {
  // Try to initialize if not already done
  if (!client) {
    initializeGemini();
  }
  
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