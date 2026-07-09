/**
 * Centralised environment configuration.
 *
 * All runtime environment variables are read here and exported as a
 * strongly-typed, immutable object.  Components and services must import
 * from this module instead of accessing `import.meta.env` directly so that
 * the entire application has a single source of truth for configuration.
 *
 * Vite exposes only variables prefixed with `VITE_` to client-side code.
 * Add the corresponding entries to `.env`, `.env.staging`, or
 * `.env.production` as needed.
 */
const env = {
  /** Base URL used by every API call.  Default: restful-api.dev sandbox. */
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'https://api.restful-api.dev',

  /** Global request timeout in milliseconds. */
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 10_000),

  /** Current environment name (development | staging | production). */
  environment: (import.meta.env.VITE_APP_ENV as string | undefined) ?? 'development',

  /** Semver string shown in the UI footer. */
  appVersion: (import.meta.env.VITE_APP_VERSION as string | undefined) ?? '1.0.0',

  /** True when Vite runs in development mode (`vite dev`). */
  isDevelopment: import.meta.env.DEV as boolean,

  /** True when Vite runs in production mode (`vite build`). */
  isProduction: import.meta.env.PROD as boolean,
} as const;

export default env;
