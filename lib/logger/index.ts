import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import type { Logger } from './types';

// Log levels for enterprise use
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Log format for structured logging
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const logEntry: Record<string, unknown> = {
      timestamp,
      level,
      message,
    };

    if (stack) {
      logEntry.stack = stack;
    }

    if (Object.keys(meta).length > 0) {
      logEntry.meta = meta;
    }

    return JSON.stringify(logEntry);
  })
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ''}`;
  })
);

// Create transports based on environment
const createTransports = () => {
  const transports: winston.transport[] = [];

  // Console transport (always enabled in development, or if no NODE_ENV is set)
  if (isDevelopment || !process.env['NODE_ENV']) {
    transports.push(
      new winston.transports.Console({
        format: consoleFormat,
        level: 'debug', // Show all logs in development
      })
    );
  }

  // Check if we can write to file system (not on read-only platforms like Vercel)
  const canWriteFiles =
    !process.env.VERCEL && !process.env.RAILWAY && !process.env.RENDER;

  // File transports for production (only if file system is writable)
  if (isProduction && canWriteFiles) {
    try {
      // Error logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          format: logFormat,
          maxSize: '20m',
          maxFiles: '14d',
          zippedArchive: true,
        })
      );

      // Combined logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          format: logFormat,
          maxSize: '20m',
          maxFiles: '7d',
          zippedArchive: true,
        })
      );
    } catch (error) {
      console.warn(
        'Failed to create file transports, falling back to console only:',
        error
      );
    }
  }

  // Always add console transport for production
  if (isProduction) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json()
        ),
        level: 'info', // Show info and above in production console
      })
    );
  }

  return transports;
};

// Create Winston logger instance with error handling
let winstonLogger: winston.Logger;

try {
  winstonLogger = winston.createLogger({
    levels: LOG_LEVELS,
    level: isDevelopment ? 'debug' : 'info',
    format: logFormat,
    transports: createTransports(),
    exitOnError: false,
    // Handle transport errors gracefully
    exceptionHandlers: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
    rejectionHandlers: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });
} catch (error) {
  // Fallback to console logging if Winston fails
  console.error(
    'Failed to initialize Winston logger, falling back to console:',
    error
  );
  winstonLogger = {
    error: (message: string, meta?: unknown) => console.error(message, meta),
    warn: (message: string, meta?: unknown) => console.warn(message, meta),
    info: (message: string, meta?: unknown) => console.info(message, meta),
    debug: (message: string, meta?: unknown) => console.debug(message, meta),
  } as winston.Logger;
}

// Create logger with context support
const createLogger = (defaultMeta: Record<string, unknown> = {}): Logger => {
  return {
    error: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.error(message, { ...defaultMeta, ...meta });
    },
    warn: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.warn(message, { ...defaultMeta, ...meta });
    },
    info: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.info(message, { ...defaultMeta, ...meta });
    },
    debug: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.debug(message, { ...defaultMeta, ...meta });
    },
    child: (childMeta: Record<string, unknown>) => {
      return createLogger({ ...defaultMeta, ...childMeta });
    },
  };
};

// Default logger instance
const logger = createLogger();

// Export both default logger and factory
export default logger;
export { createLogger };

// Export types and utilities
export type { Logger, LoggerConfig, LogMeta } from './types';
export {
  createErrorMeta,
  createPerformanceMeta,
  createRequestMeta,
  sanitizeMeta,
} from './utils';
