import crypto from 'crypto';
export function generateUserId(req: Request): string {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    return crypto.createHash('sha256').update(`${ip}-${userAgent}`).digest('hex');
}
