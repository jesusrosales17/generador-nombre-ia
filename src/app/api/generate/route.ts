import { generateNamesWithIa } from "@/services/ai/gemini";
import { generateUserId } from "./helpers/userIdGenerator";
import { canMakeRequest } from "./helpers/requestLimiter";
import { validateRequestBody } from "./helpers/requestValidator";
import { createErrorResponse, createSuccessResponse } from "./helpers/responseHandler";

export async function POST(req: Request) {
  try {
    const userId = generateUserId(req);

    if (!userId) {
      return createErrorResponse("No se pudo identificar el usuario. Inténtalo de nuevo.", 400);
    }

    const { allowed, waitTime } = canMakeRequest(userId);

    if (!allowed) {
      return createErrorResponse(`Límite de solicitudes alcanzado. Inténtalo en ${waitTime}`, 429);
    }

    
    const body = await req.json();
    validateRequestBody(body);

    const { keywords, style } = body;
    const names = await generateNamesWithIa({ keywords, style });

    return createSuccessResponse(names);
  } catch (error) {
    if (error instanceof Error) {
      return createErrorResponse(error.message, 400);
    }
    return createErrorResponse("Ocurrió un error inesperado.", 500);
  }
}
