import { useQuery } from "@tanstack/react-query";
import { getShowById } from "../api/show";
import type { GetResponse } from "../types/show";
import type { ApiError } from "../types/error";

type ShowQueryKey = ["showData", string];

export function useShowById(id: string) {
  return useQuery<GetResponse, ApiError>({
    queryKey: ["showData", id],
    queryFn: ({ queryKey }) => {
      const [, showId] = queryKey as ShowQueryKey;
      return getShowById(showId);
    },
    staleTime: 1000 * 60 * 5,
  });
}
