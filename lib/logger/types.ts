// Log levels supported by the enterprise logger
export type LogLevel = 'error' | 'warn' | 'info' | 'debug'

// Metadata that can be attached to log entries
export interface LogMeta {
  [key: string]: unknown
}

// Logger interface for enterprise logging
export interface Logger {
  error(message: string, meta?: LogMeta): void
  warn(message: string, meta?: LogMeta): void
  info(message: string, meta?: LogMeta): void
  debug(message: string, meta?: LogMeta): void
  child(defaultMeta: LogMeta): Logger
}

// Configuration options for logger creation
export interface LoggerConfig {
  service?: string
  version?: string
  environment?: string
  defaultMeta?: LogMeta
}
