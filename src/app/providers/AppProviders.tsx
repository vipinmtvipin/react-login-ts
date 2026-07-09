import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../../features/auth/presentation/state/AuthContext';
import { APP_CONSTANTS } from '../../core/constants/AppConstants';

/**
 * `AppProviders`
 *
 * Composes all application-wide context providers in one place.
 *
 * ## Order matters
 * - `BrowserRouter` must be outermost so that all children (including
 *   auth guards) can call `useNavigate` / `useLocation`.
 * - `AuthProvider` comes next so that route guards can read auth state.
 * - `ToastContainer` is rendered here so toast notifications are available
 *   everywhere without being re-mounted on route changes.
 *
 * ## How to extend
 * Add new providers (e.g. ThemeProvider, QueryClientProvider) between
 * `AuthProvider` and `{children}`:
 * ```tsx
 * <QueryClientProvider client={queryClient}>
 *   {children}
 * </QueryClientProvider>
 * ```
 */
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={APP_CONSTANTS.TOAST_AUTO_CLOSE_MS}
        closeOnClick
        pauseOnHover
        draggable
      />
      {children}
    </AuthProvider>
  </BrowserRouter>
);

export default AppProviders;
