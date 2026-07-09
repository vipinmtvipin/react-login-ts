import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import env from '../../app/config/env';
import { handleAxiosError } from '../errors/ErrorHandler';

// ---------------------------------------------------------------------------
// Storage accessor (lazy import avoids circular dependency)
// ---------------------------------------------------------------------------
import { TokenStorage } from '../storage/TokenStorage';

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

/**
 * Pre-configured Axios instance shared by the entire application.
 *
 * Do NOT use `axios.create` anywhere else — always import `http` from here
 * so that all requests benefit from the same interceptors.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ---------------------------------------------------------------------------
// Request interceptor
// ---------------------------------------------------------------------------

/**
 * Injects the access token from storage into every outgoing request.
 * If no token is present the request is still forwarded without the
 * Authorization header (public endpoints do not require one).
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = TokenStorage.get();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(handleAxiosError(error)),
);

// ---------------------------------------------------------------------------
// Response interceptor
// ---------------------------------------------------------------------------

/**
 * Passes successful responses through unchanged.
 * Maps every error response to a typed `AppError` via `handleAxiosError`.
 *
 * Extension point: add token-refresh logic for 401 responses here.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => Promise.reject(handleAxiosError(error)),
);

// ---------------------------------------------------------------------------
// Typed HTTP client
// ---------------------------------------------------------------------------

type RequestConfig = AxiosRequestConfig;

/**
 * Thin, strongly-typed wrapper around `axiosInstance`.
 *
 * All methods return the full `AxiosResponse<T>` so that callers can
 * inspect headers or status codes when needed.  Data sources typically
 * destructure `.data` from the result.
 */
const http = {
  get<T>(url: string, config: RequestConfig = {}): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(url, config);
  },
  post<T>(url: string, body?: unknown, config: RequestConfig = {}): Promise<AxiosResponse<T>> {
    return axiosInstance.post<T>(url, body, config);
  },
  put<T>(url: string, body?: unknown, config: RequestConfig = {}): Promise<AxiosResponse<T>> {
    return axiosInstance.put<T>(url, body, config);
  },
  patch<T>(url: string, body?: unknown, config: RequestConfig = {}): Promise<AxiosResponse<T>> {
    return axiosInstance.patch<T>(url, body, config);
  },
  delete<T>(url: string, config: RequestConfig = {}): Promise<AxiosResponse<T>> {
    return axiosInstance.delete<T>(url, config);
  },
};

export { http, axiosInstance };
