import type { LogMeta } from './types';

/**
 * Sanitize sensitive data from log metadata
 */
export const sanitizeMeta = (meta: LogMeta): LogMeta => {
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'authorization'];
  const sanitized = { ...meta };

  const sanitizeValue = (obj: unknown, path: string[] = []): unknown => {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = [...path, key.toLowerCase()];
        const isSensitive = sensitiveKeys.some(sensitiveKey =>
          currentPath.some(pathKey => pathKey.includes(sensitiveKey))
        );

        if (isSensitive) {
          result[key] = '[REDACTED]';
        } else {
          result[key] = sanitizeValue(value, currentPath);
        }
      }
      return result;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => sanitizeValue(item, path));
    }

    return obj;
  };

  return sanitizeValue(sanitized) as LogMeta;
};

/**
 * Create request metadata for HTTP requests
 */
export const createRequestMeta = (req: {
  method?: string;
  url?: string;
  headers?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}): LogMeta => {
  return sanitizeMeta({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.userAgent,
    headers: req.headers,
  });
};

/**
 * Create error metadata from Error objects
 */
export const createErrorMeta = (error: Error): LogMeta => {
  const meta: LogMeta = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };

  if (error.cause) {
    meta.cause = error.cause;
  }

  return meta;
};

/**
 * Create performance metadata
 */
export const createPerformanceMeta = (
  startTime: number,
  operation?: string
): LogMeta => {
  const duration = Date.now() - startTime;
  return {
    duration,
    ...(operation && { operation }),
  };
};
