import { useQuery } from "@tanstack/react-query";
import { getShowById } from "../api/show";

export function useShowById(id: string) {
  return useQuery({
    queryKey: ["showData", id],
    queryFn: ({ queryKey }) => getShowById(queryKey[1]),
    staleTime: 1000 * 60 * 5,
  });
}
