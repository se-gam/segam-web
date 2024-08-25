import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  studentId: string;
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): CustomJwtPayload {
  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function isJwtExpired(token: string): boolean {
  const decoded = decodeJwt(token);
  if (!decoded.exp) return true;
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}
