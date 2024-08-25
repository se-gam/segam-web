import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const isAuthRoute =
    nextUrl.pathname === '/' ||
    nextUrl.pathname === '/permission' ||
    nextUrl.pathname === '/login' ||
    nextUrl.pathname === '/stack/privacy';

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/check', nextUrl));
    }
    return NextResponse.next();
  }
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
