
import { configureGenerativeModel, createGenerativeAIClient } from "./geminiClient";
import { createPrompt } from "./propmUtils";
interface Props {
  keywords: string;
  style: string;
}

export const generateNamesWithIa = async ({  keywords, style}: Props) => {
  try {
    const client = createGenerativeAIClient();
    const model = await configureGenerativeModel(client);

    const promt = createPrompt(keywords, style);
    const result = await model.generateContent(promt);

    return JSON.parse(result.response.text());
 
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error en generateNames:", error.message);
        throw new Error("No se pudieron generar los nombres. Intenta nuevamente.");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error desconocido.");
      }
  }
};
