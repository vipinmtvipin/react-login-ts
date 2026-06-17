import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${loading ? styles.loading : ""} ${disabled ? styles.disabled : ""}`}
    >
      {loading ? (
        <span className={styles.spinner} aria-label="Loading" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
