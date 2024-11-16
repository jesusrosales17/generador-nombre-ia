export const createPrompt = (keywords: string, style: string): string => `
Genera cinco nombres para una empresa o producto utilizando las palabras clave: "${keywords}" y con el estilo: "${style}".
Cada nombre debe ir acompañado de una breve descripción de su adecuación. Las palabras clave son neutrales y no ofensivas.
`;