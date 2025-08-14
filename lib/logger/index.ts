import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import type { Logger } from './types'

// Log levels for enterprise use
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

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
    }

    if (stack) {
      logEntry.stack = stack
    }

    if (Object.keys(meta).length > 0) {
      logEntry.meta = meta
    }

    return JSON.stringify(logEntry)
  })
)

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ''}`
  })
)

// Create transports based on environment
const createTransports = () => {
  const transports: winston.transport[] = []

  // Console transport (always enabled in development, or if no NODE_ENV is set)
  if (isDevelopment || !process.env['NODE_ENV']) {
    transports.push(
      new winston.transports.Console({
        format: consoleFormat,
        level: 'debug',
      })
    )
  }

  // File transports for production
  if (isProduction) {
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
    )

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
    )

    // Console for production (errors only)
    transports.push(
      new winston.transports.Console({
        format: winston.format.simple(),
        level: 'error',
      })
    )
  }

  return transports
}

// Create Winston logger instance
const winstonLogger = winston.createLogger({
  levels: LOG_LEVELS,
  level: isDevelopment ? 'debug' : 'info',
  format: logFormat,
  transports: createTransports(),
  exitOnError: false,
})

// Create logger with context support
const createLogger = (defaultMeta: Record<string, unknown> = {}): Logger => {
  return {
    error: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.error(message, { ...defaultMeta, ...meta })
    },
    warn: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.warn(message, { ...defaultMeta, ...meta })
    },
    info: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.info(message, { ...defaultMeta, ...meta })
    },
    debug: (message: string, meta: Record<string, unknown> = {}) => {
      winstonLogger.debug(message, { ...defaultMeta, ...meta })
    },
    child: (childMeta: Record<string, unknown>) => {
      return createLogger({ ...defaultMeta, ...childMeta })
    },
  }
}

// Default logger instance
const logger = createLogger()

// Export both default logger and factory
export default logger
export { createLogger }

// Export types and utilities
export type { Logger, LoggerConfig, LogMeta } from './types'
export {
  createErrorMeta,
  createPerformanceMeta,
  createRequestMeta,
  sanitizeMeta,
} from './utils'
