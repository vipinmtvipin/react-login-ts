/**
 * Generic API response wrapper.
 *
 * Most REST APIs return data inside an envelope object (e.g. `{ data, message, statusCode }`).
 * Wrapping all responses in this shape lets every layer of the application
 * rely on a consistent contract regardless of which endpoint is being called.
 *
 * @template T  The shape of the payload contained in `data`.
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

/**
 * Extends `ApiResponse` for paginated list endpoints.
 *
 * @template T  The shape of each individual item in the list.
 */
export interface PaginatedApiResponse<T> extends Omit<ApiResponse<T[]>, 'data'> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
