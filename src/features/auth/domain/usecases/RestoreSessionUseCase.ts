import type { AuthRepository } from '../repositories/AuthRepository';
import type { AuthSession } from '../entities/AuthSession';

/**
 * `RestoreSessionUseCase`
 *
 * Attempts to restore an authentication session from persisted storage
 * (e.g. on application startup / page refresh).
 *
 * Returns the existing `AuthSession` if a valid token is found, or
 * `null` if the user must log in again.
 */
export class RestoreSessionUseCase {
  private readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  execute(): Promise<AuthSession | null> {
    return this.repository.restoreSession();
  }
}
