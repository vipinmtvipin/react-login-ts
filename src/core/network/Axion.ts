
import axios, { type AxiosInstance, type InternalAxiosRequestConfig,type AxiosRequestConfig, type AxiosResponse,type AxiosError } from 'axios';
import { BASE_URL } from '../constants/ApiConstants';
import { getToken } from '../storage/SessionStorage';

import { handleApiError } from "./ErrorHandler";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject auth token from sessionStorage
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string | null = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(handleApiError(error));
  }
);

// Response interceptor — delegate error handling to errorHandler
axiosInstance.interceptors.response.use(
(response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => {
    const handledError = handleApiError(error);
    return Promise.reject(handledError);
  }
);

type HTTPRequestConfig = AxiosRequestConfig;

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: HTTPRequestConfig = {}) => {
      return axios.get<T>(url, config);
    },
    delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
      return axios.delete<T>(url, config);
    },
    put: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      return axios.put<T>(url, body, config);
    },
    patch: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      return axios.patch<T>(url, body, config);
    },
    post: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      return axios.post<T>(url, body, config);
    },
  };
};

export const Http = api(axiosInstance);
