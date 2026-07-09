import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppProviders from './app/providers/AppProviders';
import AppRoutes from './app/routes/AppRoutes';

/**
 * Application entry point.
 *
 * `AppProviders` wraps the tree with all global context providers
 * (BrowserRouter, AuthProvider, ToastContainer).
 *
 * `AppRoutes` defines the route configuration and handles lazy loading,
 * protected routes, and guest routes.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </StrictMode>,
);

