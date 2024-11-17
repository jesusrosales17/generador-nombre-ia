import { NextResponse } from "next/server";

// Crea una respuesta de éxito

// Respuesta genérica de éxito
export function createSuccessResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

// Crea una respuesta de error
export function createErrorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}
