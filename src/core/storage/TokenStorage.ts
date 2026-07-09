import { LocalStorage } from './LocalStorage';

/** Storage key – centralised to avoid typo-based bugs across the codebase. */
const TOKEN_KEY = 'auth_token';

/**
 * Strongly-typed helper for persisting and retrieving the access token.
 *
 * Backed by `localStorage` so the session survives page refreshes.
 * Swap the underlying storage implementation here (e.g. to `sessionStorage`
 * or an encrypted store) without touching any other file.
 */
export const TokenStorage = {
  /** Persists `token` to local storage. */
  save(token: string): void {
    LocalStorage.set<string>(TOKEN_KEY, token);
  },

  /** Returns the stored token string, or `null` if none exists. */
  get(): string | null {
    return LocalStorage.get<string>(TOKEN_KEY);
  },

  /** Removes the stored token (called on logout). */
  remove(): void {
    LocalStorage.remove(TOKEN_KEY);
  },

  /** Returns `true` when an access token is present in storage. */
  exists(): boolean {
    return LocalStorage.has(TOKEN_KEY);
  },
};
