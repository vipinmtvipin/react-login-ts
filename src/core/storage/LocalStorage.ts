/**
 * Typed wrapper around the native `localStorage` API.
 *
 * ## Why not use localStorage directly?
 * - Centralises JSON serialisation / deserialisation.
 * - Catches `JSON.parse` errors silently (returns `null`).
 * - Provides a single place to add encryption, key prefixing, or
 *   migration logic in the future.
 *
 * ## Usage
 * ```ts
 * LocalStorage.set('user_prefs', { theme: 'dark' });
 * const prefs = LocalStorage.get<UserPrefs>('user_prefs');
 * LocalStorage.remove('user_prefs');
 * ```
 */
export class LocalStorage {
  /** Serialises `value` to JSON and persists it under `key`. */
  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage quota exceeded — fail silently in production.
    }
  }

  /**
   * Reads the item stored under `key` and deserialises it.
   * Returns `null` if the key is absent or the stored value is not valid JSON.
   */
  static get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  /** Removes the item stored under `key`. */
  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  /** Clears **all** keys from `localStorage`.  Use with caution. */
  static clear(): void {
    localStorage.clear();
  }

  /** Returns `true` if a (non-null) value exists for `key`. */
  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
