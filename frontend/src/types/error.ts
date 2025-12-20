import type { AxiosError } from "axios";

export interface ApiError extends AxiosError<ApiErrorBody> { }

interface ApiErrorBody {
  code: string;
  message: string;
  details?: string;
}
