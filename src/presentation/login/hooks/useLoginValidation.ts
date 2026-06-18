import { useState } from "react";

export const useLoginValidation = () => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateUsername = (value: string) => {
    const regex = /^[A-Za-z]{3,}$/;

    if (!value) return "Username is required";
    if (!regex.test(value)) return "Only letters, min 3 characters";

    return "";
  };

  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!value) return "Password is required";
    if (!regex.test(value))
      return "Password must include letter, number & special char";

    return "";
  };

  const validate = (username: string, password: string) => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      password: passwordError,
    });

    return !usernameError && !passwordError;
  };

  return {
    errors,
    setErrors,
    validate,
  };
};