const styleOptions = ["Creativo", "Formal", "Divertido", "Corto", "Elegante"];

// Valida el cuerpo de la solicitud
interface RequestBody {
  keywords: string;
  style: string;
}

export function validateRequestBody(body: RequestBody): void {
  const { keywords, style } = body;

  if (!keywords || !style) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (!styleOptions.includes(style)) {
    throw new Error("El estilo no es válido");
  }

  if (keywords.length > 100) {
    throw new Error("Las palabras clave no deben superar los 100 caracteres");
  }
}
