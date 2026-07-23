import { NextRequest, NextResponse } from 'next/server';

/**
 * Auth middleware — runs on the Edge before pages are rendered.
 *
 * Strategy:
 *  - Protected routes (/dashboard, /leave-calendar, /profile):
 *      No "token" cookie → redirect to /
 *  - Login route (/):
 *      Has "token" cookie → let the page render (do NOT redirect to /dashboard).
 *      The page itself will redirect after validating the token with the API.
 *      Redirecting here would create an infinite loop if the token is expired
 *      (dashboard → 307 / → middleware → 307 /dashboard → repeat).
 *
 * Note: we only check for the cookie's presence here (fast, zero network round-trip).
 * The real validation happens server-side when each page calls GET /api/auth/me.
 * If the token is invalid/expired that call returns 401 and the page redirects.
 */

const PROTECTED = ['/dashboard', '/leave-calendar', '/profile'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Redirect unauthenticated users away from protected pages
  const isProtected = PROTECTED.some((path) => pathname.startsWith(path));
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all non-static, non-API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
