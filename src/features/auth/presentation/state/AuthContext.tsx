import React, { useCallback, useEffect, useReducer } from 'react';
import { loginUseCase, logoutUseCase, restoreSessionUseCase } from '../../di/AuthContainer';
import { toAppError } from '../../../../core/errors/ErrorHandler';
import { logger } from '../../../../core/utils/Logger';
import { AuthContext } from './authContextDef';
import type { AuthState } from './authContextDef';
import type { AuthSession } from '../../domain/entities/AuthSession';
import type { LoginCredentials } from '../../domain/entities/LoginCredentials';

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type AuthAction =
  | { type: 'RESTORE_START' }
  | { type: 'RESTORE_SUCCESS'; payload: AuthSession | null }
  | { type: 'LOGIN_SUCCESS'; payload: AuthSession }
  | { type: 'LOGOUT' };

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_START':
      return { ...state, isRestoring: true };

    case 'RESTORE_SUCCESS':
      return {
        session: action.payload,
        isRestoring: false,
        isAuthenticated: action.payload !== null,
      };

    case 'LOGIN_SUCCESS':
      return {
        session: action.payload,
        isRestoring: false,
        isAuthenticated: true,
      };

    case 'LOGOUT':
      return { session: null, isRestoring: false, isAuthenticated: false };

    default:
      return state;
  }
}

const initialState: AuthState = {
  session: null,
  isRestoring: true,
  isAuthenticated: false,
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

/**
 * `AuthProvider`
 *
 * Wraps the application tree and makes authentication state available to any
 * descendant via `useAuthContext`.
 *
 * On mount it calls `restoreSessionUseCase` to restore a persisted session,
 * enabling auto-login on page refresh.
 *
 * `useReducer` is used because auth state transitions are interdependent
 * (e.g. `isAuthenticated` and `isRestoring` must stay in sync).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'RESTORE_START' });
    restoreSessionUseCase
      .execute()
      .then((session: AuthSession | null) =>
        dispatch({ type: 'RESTORE_SUCCESS', payload: session }),
      )
      .catch((err: unknown) => {
        logger.warn('Session restore failed', toAppError(err).message);
        dispatch({ type: 'RESTORE_SUCCESS', payload: null });
      });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    const session = await loginUseCase.execute(credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: session });
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await logoutUseCase.execute();
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
