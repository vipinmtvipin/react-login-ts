import React from 'react';
import styles from './Loader.module.css';

export interface LoaderProps {
  /** Accessible label read by screen readers. Default: 'Loading'. */
  label?: string;
}

/**
 * `Loader` — full-screen overlay spinner.
 *
 * Used as the `<Suspense>` fallback and in `ProtectedRoute` / `GuestRoute`
 * while the session-restore check is in progress.
 */
const Loader: React.FC<LoaderProps> = ({ label = 'Loading' }) => (
  <div className={styles.overlay}>
    <div className={styles.spinner} aria-label={label} role="status" />
  </div>
);

export default Loader;
