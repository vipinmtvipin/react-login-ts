import type { AuthRepository } from '../repositories/AuthRepository';

/**
 * `LogoutUseCase`
 *
 * Encapsulates the **logout** business operation.
 *
 * Delegates to `AuthRepository.logout` which is responsible for:
 * - Calling the backend invalidation endpoint (if applicable).
 * - Clearing the persisted access token from storage.
 *
 * The presentation layer (e.g. `AuthContext`) is responsible for clearing
 * in-memory session state and redirecting the user to the login screen
 * after `execute` resolves.
 */
export class LogoutUseCase {
  private readonly repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  execute(): Promise<void> {
    return this.repository.logout();
  }
}
