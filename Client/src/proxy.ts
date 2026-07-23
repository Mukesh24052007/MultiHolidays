import { NextRequest, NextResponse } from 'next/server';

/**
 * Auth proxy — runs on the Edge before pages are rendered.
 *
 * Strategy:
 *  - Protected routes (/dashboard, /leave-calendar, /profile):
 *      No "token" cookie → redirect to /
 *  - Login route (/):
 *      Has "token" cookie → let the page render (do NOT redirect to /dashboard here).
 *      The page itself redirects after validating the token with the API.
 *      Redirecting here would cause an infinite loop if the token is expired.
 *
 * Note: only checks cookie presence (fast, zero network round-trip).
 * Real JWT validation happens server-side in pages that call GET /api/auth/me.
 */

const PROTECTED = ['/dashboard', '/leave-calendar', '/profile'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all non-static, non-API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
