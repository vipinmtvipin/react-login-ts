import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.errorBox} role="alert">
      <span className={styles.errorText}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
