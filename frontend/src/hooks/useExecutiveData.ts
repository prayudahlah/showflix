import { useQuery } from "@tanstack/react-query";
import { getExecutiveData } from "../api/executive";
import type { ApiError } from "../types/error";
import type { ExecutiveData } from "../types/executive";

export function useExecutiveData() {
  return useQuery<ExecutiveData, ApiError>({
    queryFn: getExecutiveData,
    queryKey: ['executiveData'],
    staleTime: 1000 * 60 * 5,
  });
}
