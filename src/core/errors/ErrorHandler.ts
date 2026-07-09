import { AxiosError } from 'axios';
import { AppError, ErrorCode } from './AppError';

/**
 * Maps an `AxiosError` to a typed `AppError`.
 *
 * Centralising this logic means that every layer of the application
 * (interceptors, repositories, executors) produces consistent errors
 * without duplicating the status-code → message mapping.
 */
export function handleAxiosError(error: AxiosError): AppError {
  if (error.response) {
    const { status } = error.response;
    return new AppError(
      statusToCode(status),
      statusToMessage(status),
      status,
      error,
    );
  }

  if (error.request) {
    if (error.code === 'ECONNABORTED') {
      return new AppError(
        ErrorCode.TIMEOUT,
        'Request timed out. Please try again.',
        undefined,
        error,
      );
    }
    return new AppError(
      ErrorCode.NETWORK_ERROR,
      'Network error. Please check your internet connection and try again.',
      undefined,
      error,
    );
  }

  return new AppError(
    ErrorCode.UNKNOWN,
    error.message || 'An unexpected error occurred. Please try again.',
    undefined,
    error,
  );
}

/**
 * Guarantees that any thrown value is an `AppError`.
 * Use this at the boundary between external code and application code.
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (error instanceof AxiosError) return handleAxiosError(error);
  if (error instanceof Error) {
    return new AppError(ErrorCode.UNKNOWN, error.message, undefined, error);
  }
  return new AppError(ErrorCode.UNKNOWN, 'An unexpected error occurred.', undefined, error);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function statusToMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Bad request. Please check your input and try again.',
    401: 'Unauthorized. Your session has expired. Please log in again.',
    403: 'Forbidden. You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    422: 'Validation failed. Please review your input.',
    500: 'Internal server error. Please try again later.',
    502: 'Bad gateway. The server is temporarily unavailable.',
    503: 'Service unavailable. Please try again later.',
  };
  return messages[status] ?? `Unexpected error (HTTP ${status}).`;
}

function statusToCode(status: number): ErrorCode {
  if (status === 400) return ErrorCode.BAD_REQUEST;
  if (status === 401) return ErrorCode.UNAUTHORIZED;
  if (status === 403) return ErrorCode.FORBIDDEN;
  if (status === 404) return ErrorCode.NOT_FOUND;
  if (status === 422) return ErrorCode.VALIDATION_ERROR;
  if (status >= 500) return ErrorCode.SERVER_ERROR;
  return ErrorCode.UNKNOWN;
}
