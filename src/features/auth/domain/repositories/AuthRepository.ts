import type { AuthSession } from '../entities/AuthSession';
import type { LoginCredentials } from '../entities/LoginCredentials';

/**
 * `AuthRepository` — domain-layer contract for authentication operations.
 *
 * ## Clean Architecture rule
 * This interface lives in the **domain** layer.  It must depend **only** on
 * domain entities.  It must never import from `data/`, `presentation/`, or
 * any third-party library.
 *
 * The concrete implementation (`AuthRepositoryImpl`) lives in the data layer
 * and is injected via the DI container, keeping the dependency arrow pointing
 * inward (data → domain, never domain → data).
 */
export interface AuthRepository {
  /**
   * Authenticates the user with the provided credentials.
   * Returns an `AuthSession` containing the user profile and access token.
   * @throws {AppError} on network failure, invalid credentials, etc.
   */
  login(credentials: LoginCredentials): Promise<AuthSession>;

  /**
   * Invalidates the current session.
   * Implementations should clear any stored tokens.
   */
  logout(): Promise<void>;

  /**
   * Attempts to restore a session from persisted storage.
   * Returns the existing `AuthSession` or `null` if none is found / valid.
   */
  restoreSession(): Promise<AuthSession | null>;
}
