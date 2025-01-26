import { auth as middleware } from '@/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const isAuthRoute =
    nextUrl.pathname === '/' ||
    nextUrl.pathname === '/permission' ||
    nextUrl.pathname === '/login' ||
    nextUrl.pathname === '/stack/privacy';
  const isAdminRoute = nextUrl.pathname === '/admin/dashboard';
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('adminSession');

  if (isAdminRoute) {
    try {
      if (adminSession) {
        const { username } = JSON.parse(adminSession.value);
        if (username === 'admin') {
          return NextResponse.next();
        }
      }
    } catch (error) {
      console.error('Error parsing admin session cookie', error);
    }
    return NextResponse.redirect(new URL('/admin', nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/check', nextUrl));
    }
    return NextResponse.next();
  }
  if (!isLoggedIn && nextUrl.pathname !== '/logout' && nextUrl.pathname !== '/stack/portal') {
    return NextResponse.redirect(new URL('/logout', req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
