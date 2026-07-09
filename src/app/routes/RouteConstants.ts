/**
 * Centralised route path constants.
 *
 * Using constants instead of raw strings means:
 *  - TypeScript catches typos in `<Link to={...}>` and `navigate(...)`.
 *  - Renaming a route requires changing a single value, not searching the
 *    entire codebase.
 */
export const ROUTES = {
  /** Authenticated area */
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  /** Auth area (guest-only) */
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
} as const;
