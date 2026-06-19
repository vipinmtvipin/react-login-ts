import { useState } from "react";
import { loginUseCase } from "../../../di/AuthContainer";
import { LoginRequest } from "../../../data/model/LoginRequest";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const login = async (request: LoginRequest) => {
    try {
      setLoading(true);
      setError("");

      const user = await loginUseCase.execute(request);

      localStorage.setItem("token", user.id);

      return user;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message ?? "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
