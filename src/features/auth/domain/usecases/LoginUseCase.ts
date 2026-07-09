import type { AuthRepository } from '../repositories/AuthRepository';
import type { AuthSession } from '../entities/AuthSession';
import type { LoginCredentials } from '../entities/LoginCredentials';

/**
 * `LoginUseCase`
 *
 * Encapsulates the **login** business operation.
 *
 * ## Responsibilities
 * - Accept `LoginCredentials` from the presentation layer.
 * - Delegate the actual authentication call to `AuthRepository`.
 * - Return the resulting `AuthSession` to the caller.
 *
 * ## What does NOT belong here
 * - UI logic (navigation, toast messages).
 * - Network/HTTP concerns (handled by `AuthRepositoryImpl`).
 * - Token storage (handled by `AuthRepositoryImpl`).
 *
 * ## How to extend
 * Add business-rule validation before the repository call:
 * ```ts
 * if (credentials.username.length < 3) {
 *   throw new AppError(ErrorCode.VALIDATION_ERROR, 'Username too short');
 * }
 * ```
 */
export class LoginUseCase {
  private readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  execute(credentials: LoginCredentials): Promise<AuthSession> {
    return this.repository.login(credentials);
  }
}
