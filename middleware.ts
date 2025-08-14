import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares';
import { corsMiddleware } from './middlewares/cors';

/**
 * Main middleware function that orchestrates all middleware
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.debug(`[Middleware] Processing request for: ${pathname}`);

  // Run CORS middleware first (handles preflight requests)
  const corsResponse = await corsMiddleware(request);
  if (corsResponse) {
    return corsResponse;
  }

  // Run authentication middleware
  const authResponse = await authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  // Add other middleware here in the future
  // Example:
  // const rateLimitResponse = await rateLimitMiddleware(request);
  // if (rateLimitResponse) return rateLimitResponse;

  // If no middleware handled the request, continue
  console.debug(
    `[Middleware] No middleware handled request, continuing: ${pathname}`
  );
  return NextResponse.next();
}

export const config = {
  /*
   * Match paths that need middleware processing.
   * Includes authentication routes and API routes that need CORS.
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

    // API routes that need CORS handling
    '/api/:path*',

    // Add other middleware routes here as needed
    // '/api/rate-limited/:path*',
    // '/admin/:path*',
  ],
};
