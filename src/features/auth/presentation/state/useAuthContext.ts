import { useContext } from 'react';
import { AuthContext } from './authContextDef';
import type { AuthContextValue } from './authContextDef';

/**
 * `useAuthContext`
 *
 * Returns the current authentication context value.
 * Must be called inside an `AuthProvider` subtree.
 *
 * Splitting this hook into its own file satisfies the
 * `react-refresh/only-export-components` lint rule, which requires
 * files that export React components to export *only* components.
 */
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an <AuthProvider>.');
  }
  return ctx;
}
