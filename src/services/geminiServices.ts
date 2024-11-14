"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
interface GenerateNamesProps {
  keywords: string;
  style: string;
}


export const generateNames = async ({
  keywords,
  style,
}: GenerateNamesProps) => {
  try {
    

    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Genera cinco nombres  para una empresa o producto utilizando las palabras clave: ${keywords} y con el estilo: ${style}. Devuelve exclusivamente el resultado en formato JSON estricto, sin texto adicional ni encabezados. Usa comillas simples dentro de cada valor para evitar conflictos de comillas en JSON. Cada entrada debe incluir "name" y "description", explicando por qué es adecuado.

que el json sea directo en la respuesta sin encabezados o \`\`\`json \`\`\` y no especifiques que son nombres en el json.
`;
    const result = await model.generateContent(prompt);

    let namesData;
    try {
      console.log(result.response.text());
      // console.log(`${result.response.text()}"`)
      namesData = JSON.parse(`${result.response.text()}`);
      return namesData;
    } catch (error: Error | unknown) {
      if(error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Error desconocido');
      }
    }
  } catch (error: Error | unknown) {
    throw error;
  }
};
