import { useQuery } from "@tanstack/react-query";
import { getPersonById } from "../api/person";
import type { GetResponse } from "../types/person";
import type { ApiError } from "../types/error";

type PersonQueryKey = ["personData", string];

export function usePersonById(id: string) {
  return useQuery<GetResponse, ApiError>({
    queryKey: ["personData", id],
    queryFn: ({ queryKey }) => {
      const [, showId] = queryKey as PersonQueryKey;
      return getPersonById(showId);
    },
    staleTime: 1000 * 60 * 5,
  });
}
