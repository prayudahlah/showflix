import { useQuery } from "@tanstack/react-query";
import { getExecutiveData } from "../api/executive";

export function useExecutiveData() {
  return useQuery({
    queryFn: getExecutiveData,
    queryKey: ['executiveData'],
    staleTime: 1000 * 60 * 5,

    retry: (failureCount, error) => {
      if (error instanceof Error) {
        const isNetworkError =
          error.message.includes('Network Error') ||
          error.message.includes('ERR_CONNECTION_REFUSED') ||
          error.message.includes('NS_ERROR_CONNECTION_REFUSED') ||
          error.message.includes('Failed to fetch');

        if (isNetworkError) {
          console.error('Connection refused - stopping retry');
          return false;
        }
      }

      return failureCount < 2;
    },
  });
}
