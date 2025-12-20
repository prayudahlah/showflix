import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSearchShow } from "../api/searchShow";
import type { SearchShowRequest, SearchShowResponse } from "../types/searchShow";
import type { ApiError } from "../types/error";

export function useSearchShow() {
  const queryClient = useQueryClient();

  return useMutation<SearchShowResponse, ApiError, SearchShowRequest>({
    mutationFn: postSearchShow,
    onSuccess: (data, variables) => {
      const queryKey = ["searchShow", variables.searchTerm || ""];
      queryClient.setQueryData(queryKey, data);
    },
  });
}
