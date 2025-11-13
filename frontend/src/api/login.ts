import { api } from "./apiInstance";
import type { LoginRequest, LoginResponse } from "../types/login";

export async function postLogin(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post("login", data);
  return res.data
}
