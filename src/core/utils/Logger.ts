import env from '../../app/config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Environment-aware logger.
 *
 * - `debug` and `info` are silenced in production builds to avoid leaking
 *   implementation details.
 * - `warn` and `error` always write to the console.
 * - In a real application, the `error` handler would also forward messages
 *   to an external monitoring service (e.g. Sentry, Datadog).
 *
 * Import the `logger` singleton rather than instantiating `Logger` directly.
 */
class Logger {
  private readonly isDev: boolean;

  constructor() {
    this.isDev = env.isDevelopment;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDev) this.log('debug', message, args);
  }

  info(message: string, ...args: unknown[]): void {
    if (this.isDev) this.log('info', message, args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, args);
    // TODO: forward to monitoring service in production
  }

  private log(level: LogLevel, message: string, args: unknown[]): void {
    const prefix = `[${level.toUpperCase()}]`;
    const fullArgs = args.length > 0 ? [prefix, message, ...args] : [prefix, message];

    switch (level) {
      case 'debug': console.debug(...fullArgs); break;
      case 'info':  console.info(...fullArgs);  break;
      case 'warn':  console.warn(...fullArgs);  break;
      case 'error': console.error(...fullArgs); break;
    }
  }
}

export const logger = new Logger();
