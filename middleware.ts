import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/about', '/pricing', 
                        '/sign-in/forgot-password', '/sign-in/check-email', 
                        '/sign-in/link-expired','/sign-in/as-employee', 
                        '/sign-in/set-new-password','/sign-in/success-set-password','/sign-in', '/sign-up'];
const AUTH_ROUTES = ['/sign-in', '/sign-up', '/sign-up/complete-registration'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isPublic = PUBLIC_ROUTES.some(route => path.startsWith(route));
  const isAuthPage = AUTH_ROUTES.includes(path);

  // 1. Kalau user belum login dan akses halaman private
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // 2. Kalau user sudah login dan akses halaman auth
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
