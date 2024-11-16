
import { GoogleGenerativeAI } from "@google/generative-ai";
import {GENERATED_NAMES_SCHEMA} from './schemas'

export const createGenerativeAIClient = () => {
    const apiKey = process.env.API_KEY_GEMINI;
    if (!apiKey) {
      throw new Error("La API Key para Google Generative AI no está configurada.");
    }
  
    return new GoogleGenerativeAI(apiKey);
  };

  export const configureGenerativeModel = async (client: GoogleGenerativeAI) => {
    return  client.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: GENERATED_NAMES_SCHEMA,
      },
    });
  };
  
