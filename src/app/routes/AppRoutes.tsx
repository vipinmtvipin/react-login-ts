import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './RouteConstants';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import Loader from '../../shared/components/Loader/Loader';

// ---------------------------------------------------------------------------
// Lazy-loaded page components
//
// `React.lazy` + `Suspense` splits each page into its own bundle chunk so
// users only download code for the route they are visiting.  This is a
// critical performance optimisation for applications with many screens.
// ---------------------------------------------------------------------------

const LoginPage = lazy(
  () => import('../../features/auth/presentation/pages/LoginPage'),
);

// Placeholder for future home screen
const HomePage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to the Dashboard</h1>
        <p>You are authenticated!</p>
      </div>
    ),
  }),
);

/**
 * `AppRoutes`
 *
 * Central route configuration for the entire application.
 *
 * ## Route categories
 * | Category   | Guard          | Description                             |
 * |------------|----------------|-----------------------------------------|
 * | Guest      | `GuestRoute`   | Login / Register / Forgot Password      |
 * | Protected  | `ProtectedRoute`| Home / Dashboard / Profile / Settings  |
 * | Public     | None           | Marketing pages, T&C, etc.              |
 *
 * ## Lazy loading
 * All pages are wrapped in `React.lazy` + `<Suspense>` for automatic
 * code-splitting.  The `<Loader>` fallback ensures a smooth transition.
 */
const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loader label="Loading page..." />}>
    <Routes>
      {/* ------------------------------------------------------------------ */}
      {/* Guest routes — redirect to home if already authenticated            */}
      {/* ------------------------------------------------------------------ */}
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        {/* Future: <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} /> */}
        {/* Future: <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} /> */}
      </Route>

      {/* ------------------------------------------------------------------ */}
      {/* Protected routes — redirect to login if not authenticated           */}
      {/* ------------------------------------------------------------------ */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        {/* Future: <Route path={ROUTES.DASHBOARD}  element={<DashboardPage />}  /> */}
        {/* Future: <Route path={ROUTES.PROFILE}    element={<ProfilePage />}    /> */}
        {/* Future: <Route path={ROUTES.SETTINGS}   element={<SettingsPage />}   /> */}
      </Route>

      {/* ------------------------------------------------------------------ */}
      {/* Catch-all — redirect unknown paths to home                          */}
      {/* ------------------------------------------------------------------ */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
