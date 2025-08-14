import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip authentication for auth routes and public routes
  if (
    pathname.startsWith('/auth/') ||
    pathname === '/auth' ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Check for Authorization header
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null;

  // If no token, redirect to sign-in
  if (!token) {
    console.warn(
      `[Auth Middleware] No token found for protected route: ${pathname}`
    );
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  try {
    // Get JWT secret from environment
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error('[Auth Middleware] JWT_ACCESS_TOKEN_SECRET not configured');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // Verify the access token using jose
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    if (!payload || !payload.id) {
      console.warn(
        `[Auth Middleware] Invalid token payload for route: ${pathname}`
      );
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // Token is valid, allow request to continue
    console.debug(
      `[Auth Middleware] Valid token for user: ${payload.id} on route: ${pathname}`
    );
    return NextResponse.next();
  } catch (error) {
    // Handle JWT errors (expired, invalid signature, malformed)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown JWT error';
    console.warn(
      `[Auth Middleware] JWT verification failed for route: ${pathname}`,
      {
        error: errorMessage,
        token: token.substring(0, 20) + '...', // Log partial token for debugging
      }
    );

    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization)
   * - favicon.ico (favicon file)
   * - auth (authentication routes)
   * - / (root page)
   */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth|$).*)',
};
