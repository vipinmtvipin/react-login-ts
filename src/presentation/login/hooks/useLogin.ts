import { useState, useCallback } from "react";
import { loginUseCase } from "../../../di/AuthContainer";
import { LoginRequest } from "../../../data/model/LoginRequest";
import { saveToken } from "../../../core/storage/SessionStorage";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const login = useCallback(async (request: LoginRequest) => {
    try {
      setLoading(true);
      setError("");

      const user = await loginUseCase.execute(request);

      saveToken(user.id);

      return user;
    } catch (err: unknown) {
      setError(typeof err === "string" ? err : "Login failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    loading,
    error,
    clearError: () => setError(""),
  };
};
