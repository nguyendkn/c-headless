import { CorsConfig } from '@/types/app';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Default CORS configuration
 */
export const DEFAULT_CORS_CONFIG: CorsConfig = {
  origins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3000',
    'https://localhost:3001',
    'https://*.csmart.cloud',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  headers: [
    'Accept',
    'Accept-Language',
    'Content-Language',
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Correlation-ID',
    'X-API-Key',
    'Cache-Control',
    'Pragma',
  ],
  credentials: true,
  max_age: 86400, // 24 hours
};

/**
 * Environment-specific CORS configuration
 */
export const getCorsConfig = (): CorsConfig => {
  const env = process.env.NODE_ENV;
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];

  // Base configuration
  const config: CorsConfig = { ...DEFAULT_CORS_CONFIG };

  // Add environment-specific origins
  if (allowedOrigins.length > 0) {
    config.origins = [...(config.origins || []), ...allowedOrigins];
  }

  // Production-specific settings
  if (env === 'production') {
    // Remove localhost origins in production
    config.origins = config.origins?.filter(
      origin => !origin.includes('localhost')
    );

    // Add production domains
    const productionDomains = [
      process.env.NEXT_PUBLIC_APP_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    ].filter(Boolean) as string[];

    config.origins = [...(config.origins || []), ...productionDomains];
  }

  // Development-specific settings
  if (env === 'development') {
    // Allow all localhost ports in development
    const devOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:8000',
      'http://localhost:8080',
      'https://localhost:3000',
      'https://localhost:3001',
    ];
    config.origins = [...(config.origins || []), ...devOrigins];
  }

  return config;
};

/**
 * Check if origin is allowed
 */
export const isOriginAllowed = (
  origin: string | null,
  config: CorsConfig
): boolean => {
  if (!origin) return false;
  if (!config.origins || config.origins.length === 0) return false;

  // Check for exact match
  if (config.origins.includes(origin)) return true;

  // Check for wildcard patterns
  return config.origins.some(allowedOrigin => {
    if (allowedOrigin === '*') return true;
    if (allowedOrigin.includes('*')) {
      const pattern = allowedOrigin.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(origin);
    }
    return false;
  });
};

/**
 * Set CORS headers on response
 */
export const setCorsHeaders = (
  response: NextResponse,
  request: NextRequest,
  config: CorsConfig = getCorsConfig()
): NextResponse => {
  const origin = request.headers.get('origin');

  // Set Access-Control-Allow-Origin
  if (isOriginAllowed(origin, config)) {
    response.headers.set('Access-Control-Allow-Origin', origin!);
  } else if (config.origins?.includes('*')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
  }

  // Set Access-Control-Allow-Methods
  if (config.methods && config.methods.length > 0) {
    response.headers.set(
      'Access-Control-Allow-Methods',
      config.methods.join(', ')
    );
  }

  // Set Access-Control-Allow-Headers
  if (config.headers && config.headers.length > 0) {
    response.headers.set(
      'Access-Control-Allow-Headers',
      config.headers.join(', ')
    );
  }

  // Set Access-Control-Allow-Credentials
  if (config.credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  // Set Access-Control-Max-Age
  if (config.max_age) {
    response.headers.set('Access-Control-Max-Age', config.max_age.toString());
  }

  // Additional security headers
  response.headers.set(
    'Vary',
    'Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  return response;
};

/**
 * Handle preflight OPTIONS request
 */
export const handlePreflightRequest = (
  request: NextRequest,
  config: CorsConfig = getCorsConfig()
): NextResponse | null => {
  if (request.method !== 'OPTIONS') return null;

  const origin = request.headers.get('origin');
  const requestMethod = request.headers.get('access-control-request-method');
  const requestHeaders = request.headers.get('access-control-request-headers');

  // Check if origin is allowed
  if (!isOriginAllowed(origin, config)) {
    return new NextResponse(null, { status: 403 });
  }

  // Check if method is allowed
  if (
    requestMethod &&
    config.methods &&
    !config.methods.includes(requestMethod)
  ) {
    return new NextResponse(null, { status: 405 });
  }

  // Check if headers are allowed
  if (requestHeaders && config.headers) {
    const requestedHeaders = requestHeaders
      .split(',')
      .map(h => h.trim().toLowerCase());
    const allowedHeaders = config.headers.map(h => h.toLowerCase());

    const hasDisallowedHeaders = requestedHeaders.some(
      header => !allowedHeaders.includes(header)
    );

    if (hasDisallowedHeaders) {
      return new NextResponse(null, { status: 400 });
    }
  }

  // Create successful preflight response
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, request, config);
};

/**
 * CORS middleware function
 */
export const corsMiddleware = async (
  request: NextRequest
): Promise<NextResponse | null> => {
  const config = getCorsConfig();

  console.debug(
    `[CORS Middleware] Processing request: ${request.method} ${request.url}`
  );

  // Handle preflight requests
  const preflightResponse = handlePreflightRequest(request, config);
  if (preflightResponse) {
    console.debug('[CORS Middleware] Handled preflight request');
    return preflightResponse;
  }

  // For non-preflight requests, we'll set headers in the response
  // This will be handled by the response interceptor
  console.debug('[CORS Middleware] Non-preflight request, continuing...');
  return null;
};

/**
 * Add CORS headers to any response
 */
export const addCorsHeaders = (
  response: NextResponse,
  request: NextRequest,
  config?: CorsConfig
): NextResponse => {
  return setCorsHeaders(response, request, config || getCorsConfig());
};

/**
 * Create a CORS-enabled API response
 */
export const createCorsResponse = (
  data: any,
  request: NextRequest,
  options: {
    status?: number;
    headers?: Record<string, string>;
    config?: CorsConfig;
  } = {}
): NextResponse => {
  const { status = 200, headers = {}, config } = options;

  const response = NextResponse.json(data, {
    status,
    headers,
  });

  return setCorsHeaders(response, request, config || getCorsConfig());
};

/**
 * Utility function to check if request needs CORS handling
 */
export const needsCorsHandling = (request: NextRequest): boolean => {
  const origin = request.headers.get('origin');
  const userAgent = request.headers.get('user-agent');

  // Skip CORS for same-origin requests
  if (!origin) return false;

  // Skip CORS for server-side requests (no user-agent typically means server-side)
  if (!userAgent) return false;

  // Check if origin is different from request URL
  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);

    return originUrl.origin !== requestUrl.origin;
  } catch {
    return true; // If we can't parse URLs, assume CORS is needed
  }
};

export default {
  getCorsConfig,
  isOriginAllowed,
  setCorsHeaders,
  handlePreflightRequest,
  corsMiddleware,
  addCorsHeaders,
  createCorsResponse,
  needsCorsHandling,
  DEFAULT_CORS_CONFIG,
};
