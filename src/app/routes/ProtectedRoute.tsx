import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/presentation/state/useAuthContext';
import { ROUTES } from './RouteConstants';
import Loader from '../../shared/components/Loader/Loader';

/**
 * `ProtectedRoute`
 *
 * Wraps routes that require an authenticated session.
 *
 * Behaviour:
 * - While the session-restore check is in progress → shows a full-screen
 *   loader to prevent a flash of the login page.
 * - Authenticated → renders the nested `<Outlet>`.
 * - Not authenticated → redirects to the login screen (replacing the history
 *   entry so the back button does not return the user to a protected page).
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isRestoring } = useAuthContext();

  if (isRestoring) {
    return <Loader label="Loading session..." />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} replace />;
};

export default ProtectedRoute;
