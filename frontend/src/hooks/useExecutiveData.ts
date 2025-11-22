import { useQuery } from "@tanstack/react-query";
import { getExecutiveData } from "../api/executive";

export function useExecutiveData() {
  return useQuery({
    queryFn: getExecutiveData,
    queryKey: ['executiveData'],
    staleTime: 1000 * 60 * 5,
  });
}
