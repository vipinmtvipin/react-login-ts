import { AxiosError } from 'axios';

export function handleApiError(error: AxiosError): string {
  if (error.response) {
    const { status } = error.response;

    switch (status) {
      case 400:
        return 'Bad request. Please check your input and try again.';
      case 401:
        return 'Unauthorized. Your session has expired. Please log in again.';
      case 403:
        return 'Forbidden. You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 422:
        return 'Validation failed. Please review your input.';
      case 500:
        return 'Internal server error. Please try again later.';
      case 502:
        return 'Bad gateway. The server is temporarily unavailable.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return `An unexpected error occurred (status ${status}). Please try again.`;
    }
  }

  if (error.request) {
    // Request was made but no response received — network error
    return 'Network error. Please check your internet connection and try again.';
  }

  // Error occurred while setting up the request
  return error.message || 'An unexpected error occurred. Please try again.';
}
