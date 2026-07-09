import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string | null;
}

/**
 * `ErrorMessage` — inline error banner.
 *
 * Renders nothing when `message` is falsy so it can be used unconditionally
 * in form layouts without an extra `&&` guard.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.errorBox} role="alert">
      <span className={styles.errorText}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
