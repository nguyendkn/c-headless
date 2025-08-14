/**
 * Middleware exports
 * 
 * This file serves as the main entry point for all middleware functions.
 * Import and export all middleware here for easy access.
 */

// Authentication middleware
export { authMiddleware, AUTH_CONFIG, getAuthMatcher } from './auth';

// Future middleware exports
// export { rateLimitMiddleware } from './rate-limit';
// export { corsMiddleware } from './cors';
// export { securityMiddleware } from './security';
// export { analyticsMiddleware } from './analytics';

/**
 * Middleware execution order
 * 
 * The order in which middleware is executed matters.
 * Generally, follow this order:
 * 
 * 1. Security middleware (CORS, headers, etc.)
 * 2. Rate limiting
 * 3. Authentication
 * 4. Authorization
 * 5. Analytics/logging
 * 6. Feature-specific middleware
 */

export const MIDDLEWARE_ORDER = {
  SECURITY: 1,
  RATE_LIMIT: 2,
  AUTHENTICATION: 3,
  AUTHORIZATION: 4,
  ANALYTICS: 5,
  FEATURE: 6,
} as const;
