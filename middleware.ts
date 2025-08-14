import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares';

/**
 * Main middleware function that orchestrates all middleware
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.debug(`[Middleware] Processing request for: ${pathname}`);

  // Run authentication middleware
  const authResponse = await authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  // Add other middleware here in the future
  // Example:
  // const rateLimitResponse = await rateLimitMiddleware(request);
  // if (rateLimitResponse) return rateLimitResponse;

  // const corsResponse = await corsMiddleware(request);
  // if (corsResponse) return corsResponse;

  // If no middleware handled the request, continue
  console.debug(
    `[Middleware] No middleware handled request, continuing: ${pathname}`
  );
  return NextResponse.next();
}

export const config = {
  /*
   * Match paths that need middleware processing.
   * Currently includes authentication routes.
   *
   * Note: We use a broad matcher and let individual middleware
   * decide if they should handle the request for better flexibility.
   */
  matcher: [
    // Authentication routes
    '/apps/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/sign-in',
    '/auth/sign-up',

    // Add other middleware routes here as needed
    // '/api/rate-limited/:path*',
    // '/admin/:path*',
  ],
};
