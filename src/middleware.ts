import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasPassword = request.cookies.has('encrypted');
  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');
  const requestUrl = request.nextUrl.pathname;
  const isLoggedIn = hasPassword && hasAccessToken && hasRefreshToken;
  if (requestUrl === '/logout') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('encrypted');
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
  if (isLoggedIn && (requestUrl === '/' || requestUrl === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (!isLoggedIn && requestUrl.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/', '/logout'],
};
