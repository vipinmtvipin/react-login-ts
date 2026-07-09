import { useState, useCallback } from 'react';
import { VALIDATION_PATTERNS } from '../../../../core/constants/AppConstants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginValidationErrors {
  username: string;
  password: string;
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

const MESSAGES = {
  username: {
    required: 'Username is required.',
    invalid: 'Only letters are allowed, minimum 3 characters.',
  },
  password: {
    required: 'Password is required.',
    invalid: 'Must be at least 6 characters with a letter, number, and special character.',
  },
} as const;

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * `useLoginValidation`
 *
 * Encapsulates all field-level validation for the login form.
 *
 * Validation patterns live in `AppConstants` so they can be shared with
 * other forms (e.g. registration).  Messages are local to this hook so
 * they remain easy to localise in the future.
 */
export function useLoginValidation() {
  const [errors, setErrors] = useState<LoginValidationErrors>({
    username: '',
    password: '',
  });

  const validateUsername = useCallback((value: string): string => {
    if (!value.trim()) return MESSAGES.username.required;
    if (!VALIDATION_PATTERNS.USERNAME.test(value)) return MESSAGES.username.invalid;
    return '';
  }, []);

  const validatePassword = useCallback((value: string): string => {
    if (!value) return MESSAGES.password.required;
    if (!VALIDATION_PATTERNS.PASSWORD.test(value)) return MESSAGES.password.invalid;
    return '';
  }, []);

  /** Validates both fields; returns `true` if the form is valid. */
  const validate = useCallback(
    (username: string, password: string): boolean => {
      const usernameError = validateUsername(username);
      const passwordError = validatePassword(password);
      setErrors({ username: usernameError, password: passwordError });
      return !usernameError && !passwordError;
    },
    [validateUsername, validatePassword],
  );

  /** Validates a single field on blur and updates only that error. */
  const validateField = useCallback(
    (field: keyof LoginValidationErrors, value: string): void => {
      const error = field === 'username' ? validateUsername(value) : validatePassword(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateUsername, validatePassword],
  );

  const clearErrors = useCallback(() => {
    setErrors({ username: '', password: '' });
  }, []);

  return { errors, validate, validateField, clearErrors };
}
