import { useState, useCallback } from 'react';
import { useAuthContext } from '../state/useAuthContext';
import type { LoginCredentials } from '../../domain/entities/LoginCredentials';
import { toAppError } from '../../../../core/errors/ErrorHandler';

/**
 * `useLogin`
 *
 * Presentation-layer hook that bridges the login form and `AuthContext`.
 *
 * ## Responsibilities
 * - Manage local loading and error UI state.
 * - Call `AuthContext.login` (which delegates to `LoginUseCase`).
 * - Surface a human-readable error message for the form.
 *
 * ## What does NOT belong here
 * - Business validation (belongs in the domain use case or `useLoginValidation`).
 * - Navigation (the caller / page component handles routing after login).
 * - Token persistence (handled by `AuthRepositoryImpl`).
 */
export function useLogin() {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setLoading(true);
      setError('');

      try {
        await login(credentials);
        return true;
      } catch (err: unknown) {
        const appError = toAppError(err);
        setError(appError.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [login],
  );

  const clearError = useCallback(() => setError(''), []);

  return { handleLogin, loading, error, clearError };
}
