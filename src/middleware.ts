import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasPassword = request.cookies.has('encrypted');
  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');
  const isLoggedIn = hasPassword && hasAccessToken && hasRefreshToken;
  if (request.nextUrl.pathname === '/dashboard' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (request.nextUrl.pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
