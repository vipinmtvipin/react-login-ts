import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  name?: string;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  onSuffixClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  name,
  suffixIcon,
  prefixIcon,
  onSuffixClick,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {prefixIcon && <div className={styles.inputIcon}>{prefixIcon}</div>}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {suffixIcon && (
          <div
            className={styles.inputIcon}
            onClick={onSuffixClick}
            style={{ cursor: onSuffixClick ? "pointer" : "default" }}
          >
            {suffixIcon}
          </div>
        )}
      </div>

      {error && (
        <span id={`${name}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
