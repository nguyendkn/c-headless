import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Authentication middleware configuration
 */
export const AUTH_CONFIG = {
  // Routes that require authentication
  protectedRoutes: ['/apps', '/dashboard', '/profile'],

  // Routes that should redirect if already authenticated
  authRoutes: ['/auth/sign-in', '/auth/sign-up'],

  // Default redirect paths
  redirects: {
    unauthenticated: '/auth/sign-in',
    authenticated: '/apps',
  },

  // Cookie names
  cookies: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  },
} as const;

/**
 * Check if a path matches any of the given route patterns
 */
function matchesRoutes(pathname: string, routes: readonly string[]): boolean {
  return routes.some(route => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname === route || pathname.startsWith(route + '/');
  });
}

/**
 * Verify JWT token
 */
async function verifyToken(token: string): Promise<any> {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_TOKEN_SECRET not configured');
  }

  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  if (!payload || !payload.id) {
    throw new Error('Invalid token payload');
  }

  return payload;
}

/**
 * Handle protected routes that require authentication
 */
async function handleProtectedRoute(
  request: NextRequest,
  pathname: string
): Promise<NextResponse | null> {
  const accessToken = request.cookies.get(
    AUTH_CONFIG.cookies.accessToken
  )?.value;

  console.log(`[Auth Middleware] Protected route check:`, {
    pathname,
    hasAccessToken: !!accessToken,
    cookieName: AUTH_CONFIG.cookies.accessToken,
    allCookies: Object.fromEntries(
      Array.from(
        request.cookies
          .getAll()
          .map(cookie => [cookie.name, cookie.value?.substring(0, 20) + '...'])
      )
    ),
  });

  if (!accessToken) {
    console.warn(
      `[Auth Middleware] No access token found for protected route: ${pathname}`
    );
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.redirects.unauthenticated, request.url)
    );
  }

  try {
    const payload = await verifyToken(accessToken);

    console.log(
      `[Auth Middleware] Valid token for user: ${payload.id} on route: ${pathname}`
    );
    return null; // Continue to next middleware/route
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown JWT error';
    console.warn(
      `[Auth Middleware] JWT verification failed for route: ${pathname}`,
      {
        error: errorMessage,
        token: accessToken.substring(0, 20) + '...',
      }
    );

    return NextResponse.redirect(
      new URL(AUTH_CONFIG.redirects.unauthenticated, request.url)
    );
  }
}

/**
 * Handle auth routes that should redirect if already authenticated
 */
async function handleAuthRoute(
  request: NextRequest,
  pathname: string
): Promise<NextResponse | null> {
  const accessToken = request.cookies.get(
    AUTH_CONFIG.cookies.accessToken
  )?.value;

  if (!accessToken) {
    return null; // No token, allow access to auth routes
  }

  try {
    const payload = await verifyToken(accessToken);

    console.debug(
      `[Auth Middleware] Authenticated user accessing auth route, redirecting to ${AUTH_CONFIG.redirects.authenticated}`
    );
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.redirects.authenticated, request.url)
    );
  } catch (error) {
    // Token is invalid, allow access to auth routes
    console.debug(
      `[Auth Middleware] Invalid token on auth route, allowing access`
    );
    return null;
  }
}

/**
 * Main authentication middleware function
 */
export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  console.log(`[Auth Middleware] Processing: ${pathname}`);

  // Check if this is a protected route
  const isProtectedRoute = matchesRoutes(pathname, AUTH_CONFIG.protectedRoutes);
  const isAuthRoute = matchesRoutes(pathname, AUTH_CONFIG.authRoutes);

  console.log(`[Auth Middleware] Route analysis:`, {
    pathname,
    isProtectedRoute,
    isAuthRoute,
    protectedRoutes: AUTH_CONFIG.protectedRoutes,
    authRoutes: AUTH_CONFIG.authRoutes,
  });

  // Skip auth middleware for routes that don't need it
  if (!isProtectedRoute && !isAuthRoute) {
    console.log(
      `[Auth Middleware] Skipping auth for public route: ${pathname}`
    );
    return null;
  }

  // Handle protected routes
  if (isProtectedRoute) {
    console.log(`[Auth Middleware] Handling protected route: ${pathname}`);
    return await handleProtectedRoute(request, pathname);
  }

  // Handle auth routes
  if (isAuthRoute) {
    console.log(`[Auth Middleware] Handling auth route: ${pathname}`);
    return await handleAuthRoute(request, pathname);
  }

  return null;
}

/**
 * Get matcher patterns for auth middleware
 */
export function getAuthMatcher(): string[] {
  return [
    ...AUTH_CONFIG.protectedRoutes.map(route =>
      route.endsWith('*') ? route : `${route}/:path*`
    ),
    ...AUTH_CONFIG.authRoutes,
  ];
}
