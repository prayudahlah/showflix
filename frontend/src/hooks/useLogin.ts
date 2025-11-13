import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api/login";
import type { LoginRequest, LoginResponse } from "../types/login";
import type { ApiError } from "../types/error";

export function useLogin() {
  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem("role_name", data.role ?? "");
    }
  });
}
