/**
 * Application-wide API endpoint constants.
 *
 * Centralising endpoint paths here means that:
 *  - A path change requires editing exactly one place.
 *  - TypeScript provides auto-complete on endpoint keys.
 *  - There are no magic strings scattered across data sources.
 *
 * Note: The base URL is now managed by `src/app/config/env.ts` so that it
 * can be overridden per environment without touching source code.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/objects',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
  },
} as const;
