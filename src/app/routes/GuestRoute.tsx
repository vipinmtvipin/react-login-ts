import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/presentation/state/useAuthContext';
import { ROUTES } from './RouteConstants';
import Loader from '../../shared/components/Loader/Loader';

/**
 * `GuestRoute`
 *
 * Wraps routes that should only be accessible to **unauthenticated** users
 * (login, register, forgot-password).
 *
 * Behaviour:
 * - While the session-restore check is in progress → shows a loader.
 * - Already authenticated → redirects to the home screen.
 * - Not authenticated → renders the nested `<Outlet>`.
 */
const GuestRoute: React.FC = () => {
  const { isAuthenticated, isRestoring } = useAuthContext();

  if (isRestoring) {
    return <Loader label="Loading session..." />;
  }

  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};

export default GuestRoute;
