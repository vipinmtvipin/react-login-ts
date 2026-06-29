import { useState, useCallback } from "react";

// Validation patterns extracted as constants for reusability
const VALIDATION_PATTERNS = {
  username: /^[A-Za-z]{3,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
} as const;

const VALIDATION_MESSAGES = {
  username: {
    required: "Username is required",
    invalid: "Only letters, min 3 characters",
  },
  password: {
    required: "Password is required",
    invalid: "Password must include letter, number & special char",
  },
} as const;

export type ValidationErrors = {
  username: string;
  password: string;
};


export const useLoginValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({
    username: "",
    password: "",
  });


  const validateUsername = useCallback((value: string): string => {
    if (!value.trim()) {
      return VALIDATION_MESSAGES.username.required;
    }
    if (!VALIDATION_PATTERNS.username.test(value)) {
      return VALIDATION_MESSAGES.username.invalid;
    }
    return "";
  }, []);

 
  const validatePassword = useCallback((value: string): string => {
    if (!value) {
      return VALIDATION_MESSAGES.password.required;
    }
    if (!VALIDATION_PATTERNS.password.test(value)) {
      return VALIDATION_MESSAGES.password.invalid;
    }
    return "";
  }, []);

  const validate = useCallback(
    (username: string, password: string): boolean => {
      const usernameError = validateUsername(username);
      const passwordError = validatePassword(password);

      setErrors({
        username: usernameError,
        password: passwordError,
      });

      return !usernameError && !passwordError;
    },
    [validateUsername, validatePassword]
  );

  const validateField = useCallback(
    (field: "username" | "password", value: string): void => {
      const error =
        field === "username" ? validateUsername(value) : validatePassword(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateUsername, validatePassword]
  );

  const clearErrors = useCallback(() => {
    setErrors({ username: "", password: "" });
  }, []);

  return {
    errors,
    validate,
    validateField,
    clearErrors,
  };
};