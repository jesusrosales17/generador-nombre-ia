import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { generateNames } from '@/services/geminiServices';
const styleOptions = ["Creativo", "Formal", "Divertido", "Corto", "Elegante"];

const requestLimit = 10;
const hourInMs = 60 * 60 * 1000;

// Definimos el tipo de cada solicitud en `requests`
interface UserRequest {
    count: number;
    startTime: number;
}

// Objeto para rastrear solicitudes por usuario
const requests: { [key: string]: UserRequest } = {};

// Función para generar un identificador único basado en IP y User-Agent
function generateUserId(req: Request): string {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    return crypto.createHash('sha256').update(`${ip}-${userAgent}`).digest('hex');
}

// Función para convertir milisegundos a formato hh:mm:ss
function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Función para verificar si el usuario puede hacer la solicitud
function canMakeRequest(userId: string): { allowed: boolean; waitTime?: string } {
    const currentTime = Date.now();

    if (!requests[userId]) {
        requests[userId] = { count: 1, startTime: currentTime };
        return { allowed: true };
    }

    const userRequests = requests[userId];

    // Reiniciar el contador cada hora
    if (currentTime - userRequests.startTime > hourInMs) {
        userRequests.count = 1;
        userRequests.startTime = currentTime;
        return { allowed: true };
    }

    // Verificar si el usuario está por debajo del límite de solicitudes
    if (userRequests.count < requestLimit) {
        userRequests.count += 1;
        return { allowed: true };
    }

    // Calcular tiempo de espera y formatearlo en hh:mm:ss
    const waitTimeMs = hourInMs - (currentTime - userRequests.startTime);
    const formattedWaitTime = formatTime(waitTimeMs);

    return { allowed: false, waitTime: formattedWaitTime };
}

// Exporta la función `POST` para manejar las solicitudes POST
export async function POST(req: Request) {
    const userId = generateUserId(req);
    if(!userId) {
        return NextResponse.json(
            {
                error: "No se pudo identificar el usuario. Inténtalo de nuevo.",
            },
            { status: 400 }
        );
    }

    const { allowed, waitTime } = canMakeRequest(userId);

    if (!allowed) {
        return NextResponse.json(
            {
                error: "Límite de solicitudes alcanzado. Inténtalo en " + waitTime,
               
            },
            { status: 429 }
        );
    }

    const { keywords, style } = await req.json();
    // Procesar la solicitud
    try {
        if (!keywords || !style) {
            throw new Error("Todos los campos son obligatorios");
          }
         
      
          if (!styleOptions.includes(style)) {
            throw new Error("El estilo no es valido");
          }
      
          if(keywords.length > 100) {
            throw new Error("Las palabras clave no deben superar los 100 caracteres");
          }

        const names = await generateNames({ keywords, style });
        return NextResponse.json(names);
    } catch (error: Error | unknown) {
       if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // Si el error no es una instancia de `Error`, envía un mensaje genérico
            return NextResponse.json({ error: "Ocurrió un error inesperado." }, { status: 400 });
        }
    }


    return NextResponse.json({ message: "Solicitud procesada con éxito." });
}
