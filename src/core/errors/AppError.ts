/**
 * Typed error codes used across the entire application.
 *
 * Defined as a `const` object + discriminated union type instead of an
 * `enum` so that the TypeScript `erasableSyntaxOnly` compiler option is
 * respected (enums produce JavaScript output and are therefore not
 * "erasable").
 */
export const ErrorCode = {
  /** HTTP 400 */
  BAD_REQUEST: 'BAD_REQUEST',
  /** HTTP 401 – expired or missing access token */
  UNAUTHORIZED: 'UNAUTHORIZED',
  /** HTTP 403 – valid token but insufficient permissions */
  FORBIDDEN: 'FORBIDDEN',
  /** HTTP 404 */
  NOT_FOUND: 'NOT_FOUND',
  /** HTTP 422 */
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  /** HTTP 5xx */
  SERVER_ERROR: 'SERVER_ERROR',
  /** Request timed out before a response was received */
  TIMEOUT: 'TIMEOUT',
  /** No network connectivity */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** Catch-all for any error not mapped above */
  UNKNOWN: 'UNKNOWN',
} as const;

/** Union type of all valid error code strings. */
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Domain-level error class.
 *
 * All errors that bubble up through the application layers should be
 * instances of (or subclasses of) `AppError`.  This ensures that:
 *
 *  - Every error has a stable, typed `code` that can be handled
 *    programmatically.
 *  - The optional `statusCode` preserves the original HTTP status for
 *    logging and monitoring purposes.
 *  - The original `cause` is retained so that stack traces are not lost.
 *
 * @example
 * throw new AppError(ErrorCode.UNAUTHORIZED, 'Session expired', 401, originalError);
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode?: number;
  /** The underlying error (e.g. AxiosError) that produced this AppError. */
  public readonly cause?: unknown;

  constructor(code: ErrorCode, message: string, statusCode?: number, cause?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.cause = cause;

    // Maintain proper prototype chain in environments that transpile classes.
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /** Returns true if this error was caused by an expired/missing token. */
  isUnauthorized(): boolean {
    return this.code === ErrorCode.UNAUTHORIZED;
  }

  /** Returns true if this error represents a connectivity problem. */
  isNetworkError(): boolean {
    return this.code === ErrorCode.NETWORK_ERROR || this.code === ErrorCode.TIMEOUT;
  }

  /** Serialises the error to a plain object for logging / monitoring. */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
