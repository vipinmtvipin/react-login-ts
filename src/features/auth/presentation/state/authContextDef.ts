/**
 * Shared context type and context object definition.
 *
 * Separated from `AuthContext.tsx` (which exports the `AuthProvider`
 * component) so that both the hook and the provider can import the
 * context reference without violating the
 * `react-refresh/only-export-components` lint rule.
 */
import { createContext } from 'react';
import type { LoginCredentials } from '../../domain/entities/LoginCredentials';
import type { AuthSession } from '../../domain/entities/AuthSession';

/** Internal auth state shape. */
export interface AuthState {
  session: AuthSession | null;
  /** True while the initial session-restore check is in progress. */
  isRestoring: boolean;
  isAuthenticated: boolean;
}

/** Full value exposed by the Auth context. */
export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
