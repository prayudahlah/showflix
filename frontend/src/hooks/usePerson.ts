import { useQuery } from "@tanstack/react-query";
import { getPersonById } from "../api/person";

export function usePersonById(id: string) {
  return useQuery({
    queryKey: ["personData", id],
    queryFn: ({ queryKey }) => getPersonById(queryKey[1]),
    staleTime: 1000 * 60 * 5,
  });
}
