import { AppError, ErrorCode } from '../errors/AppError';
import { toAppError } from '../errors/ErrorHandler';
import { logger } from '../utils/Logger';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Configuration for a single API call executed via `ApiExecutor.execute`.
 *
 * @template T  The resolved value type of `request`.
 */
export interface ExecuteConfig<T> {
  /** A zero-argument function that returns a Promise (e.g. a data-source method). */
  request: () => Promise<T>;
  /** Called with the resolved value when the request succeeds. */
  onSuccess?: (data: T) => void;
  /** Called with a typed `AppError` if all attempts fail. */
  onError?: (error: AppError) => void;
  /**
   * Number of *additional* attempts after the first failure.
   * Each retry waits `retryDelay * attempt` ms (linear back-off).
   * Default: `0` (no retries).
   */
  retries?: number;
  /** Base delay in milliseconds between retries. Default: `500`. */
  retryDelay?: number;
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// ApiExecutor
// ---------------------------------------------------------------------------

/**
 * Generic, reusable API executor.
 *
 * ## Why this exists
 * Calling `await someDataSource.method()` everywhere duplicates error
 * mapping, retry logic, and callback wiring.  `ApiExecutor` centralises
 * all of that so every feature stays lean.
 *
 * ## Single call
 * ```ts
 * const user = await apiExecutor.execute({
 *   request: () => authDataSource.login(credentials),
 *   onSuccess: (user) => saveSession(user),
 *   onError:   (err)  => toast.error(err.message),
 *   retries: 2,
 * });
 * ```
 *
 * ## Multiple independent calls (`Promise.all`)
 * Use when **all** requests must succeed.  If any one rejects the entire
 * batch fails fast — ideal for a dashboard that requires all data.
 * ```ts
 * const [profile, settings] = await apiExecutor.executeAll([
 *   () => userDataSource.getProfile(),
 *   () => userDataSource.getSettings(),
 * ]);
 * ```
 *
 * ## Partial-success calls (`Promise.allSettled`)
 * Use when each request is independent and partial results are acceptable —
 * e.g. a notification feed that should still render even if one widget
 * fails.
 * ```ts
 * const results = await apiExecutor.executeAllSettled([
 *   () => ordersDataSource.getRecent(),
 *   () => notificationsDataSource.getUnread(),
 * ]);
 * const orders = results[0].status === 'fulfilled' ? results[0].value : [];
 * ```
 */
export class ApiExecutor {
  /**
   * Executes a single request with optional retry and callback hooks.
   *
   * @throws {AppError} if all attempts are exhausted.
   */
  async execute<T>(config: ExecuteConfig<T>): Promise<T> {
    const { request, onSuccess, onError, retries = 0, retryDelay = 500 } = config;
    let lastError: AppError | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      if (attempt > 0) {
        await delay(retryDelay * attempt);
        logger.info(`[ApiExecutor] Retry attempt ${attempt}/${retries}`);
      }

      try {
        const result = await request();
        onSuccess?.(result);
        return result;
      } catch (err: unknown) {
        lastError = toAppError(err);
        logger.warn(`[ApiExecutor] Attempt ${attempt + 1} failed: ${lastError.message}`);

        // Do not retry client-side errors (4xx except 429 Too Many Requests).
        const isClientError =
          lastError.statusCode !== undefined &&
          lastError.statusCode >= 400 &&
          lastError.statusCode < 500 &&
          lastError.statusCode !== 429;

        if (isClientError) break;
      }
    }

    const error = lastError ?? new AppError(ErrorCode.UNKNOWN, 'An unexpected error occurred.');
    onError?.(error);
    throw error;
  }

  /**
   * Executes multiple independent requests in parallel.
   * Uses `Promise.all` — **all** requests must succeed, otherwise the
   * returned promise rejects with the first encountered `AppError`.
   *
   * @throws {AppError} on first rejection.
   */
  async executeAll<T extends readonly unknown[]>(
    requests: { [K in keyof T]: () => Promise<T[K]> },
  ): Promise<T> {
    try {
      const fns = requests as unknown as Array<() => Promise<unknown>>;
      const promises = fns.map((fn) => fn());
      return (await Promise.all(promises)) as unknown as T;
    } catch (err: unknown) {
      throw toAppError(err);
    }
  }

  /**
   * Executes multiple independent requests in parallel.
   * Uses `Promise.allSettled` — each request may succeed or fail
   * independently.  Inspect each `PromiseSettledResult` to handle partial
   * failures gracefully.
   */
  async executeAllSettled<T>(
    requests: Array<() => Promise<T>>,
  ): Promise<PromiseSettledResult<T>[]> {
    const promises = requests.map((fn) => fn());
    return Promise.allSettled(promises);
  }
}

/** Singleton executor — import this in data sources and use-cases. */
export const apiExecutor = new ApiExecutor();
