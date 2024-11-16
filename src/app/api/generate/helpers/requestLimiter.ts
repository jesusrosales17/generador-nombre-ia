import { formatTime } from './timeFormatter';

const requestLimit = 60;
const hourInMs = 60 * 60 * 1000;

interface UserRequest {
    count: number;
    startTime: number;
}

const requests: { [key: string]: UserRequest } = {};



// Función para verificar si el usuario puede hacer la solicitud
export function canMakeRequest(userId: string): { allowed: boolean; waitTime?: string } {
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