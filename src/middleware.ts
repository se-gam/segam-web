import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasPassword = request.cookies.has('encrypted');
  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');
  const requestUrl = request.nextUrl.pathname;
  const isLoggedIn = hasPassword && hasAccessToken && hasRefreshToken;
  if (requestUrl === '/logout') {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('encrypted');
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
  if (
    isLoggedIn &&
    (requestUrl === '/' || requestUrl === '/permission' || requestUrl === '/login')
  ) {
    return NextResponse.redirect(new URL('/update', request.url));
  }
  if (
    !isLoggedIn &&
    (requestUrl.includes('/dashboard') ||
      requestUrl.includes('/check') ||
      requestUrl.includes('/update'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/',
    '/logout',
    '/reservation/:path*',
    '/check',
    '/update',
  ],
};
