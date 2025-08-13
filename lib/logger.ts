import pino, { Logger } from 'pino';

const isProduction = process.env['NODE_ENV'] === 'production';

export const logger: Logger = isProduction
  ? pino({
      level: process.env['LOG_LEVEL'] ?? 'warn',
      timestamp: pino.stdTimeFunctions.isoTime,
      base: {
        env: process.env['NODE_ENV'],
      },
    })
  : pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      },
      level: process.env['LOG_LEVEL'] ?? 'debug',
      base: {
        env: process.env['NODE_ENV'],
      },
    });

export function createChildLogger(
  moduleName: string,
  context: Record<string, unknown> = {}
): Logger {
  return logger.child({ module: moduleName, ...context });
}
