import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSearchPerson } from "../api/searchPerson";
import type { SearchPersonRequest, SearchPersonResponse } from "../types/searchPerson";
import type { ApiError } from "../types/error";

export function useSearchPerson() {
  const queryClient = useQueryClient();

  return useMutation<SearchPersonResponse, ApiError, SearchPersonRequest>({
    mutationFn: postSearchPerson,
    onSuccess: (data, variables) => {
      const queryKey = ["searchPerson", variables.searchTerm || ""];
      queryClient.setQueryData(queryKey, data);
    },
  });
}
