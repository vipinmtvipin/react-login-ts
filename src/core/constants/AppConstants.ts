/**
 * Miscellaneous application-level constants.
 *
 * Keep this file focused on non-API, non-route constants that are shared
 * across multiple features (e.g. pagination defaults, regex patterns,
 * storage key names).
 */
export const APP_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_RETRY_ATTEMPTS: 3,
  TOAST_AUTO_CLOSE_MS: 3_000,
} as const;

/**
 * Regular-expression patterns reused by validation helpers.
 * Defining them here prevents the same pattern being re-compiled on every
 * render inside a hook.
 */
export const VALIDATION_PATTERNS = {
  /** At least 3 alphabetic characters. */
  USERNAME: /^[A-Za-z]{3,}$/,
  /**
   * At least 6 characters containing at least one letter, one digit,
   * and one special character.
   */
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  /** RFC-5322–inspired email pattern. */
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
