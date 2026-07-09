import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  /** Accessible label shown to screen readers when `loading` is true. */
  loadingLabel?: string;
}

/**
 * `Button` — shared, reusable button component.
 *
 * Handles loading state (shows spinner, disables click), disabled state,
 * and full-width layout via props.  Accepts a `children` prop so the label
 * is always provided by the caller — no hardcoded text.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingLabel = 'Loading',
}) => {
  const className = [
    styles.button,
    fullWidth ? styles.fullWidth : '',
    loading   ? styles.loading   : '',
    disabled  ? styles.disabled  : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? (
        <span className={styles.spinner} aria-label={loadingLabel} role="status" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
