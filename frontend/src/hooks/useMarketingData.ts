import { useQuery } from "@tanstack/react-query";
import { getMarketingData } from "../api/marketing";
import type { ApiError } from "../types/error";
import type { MarketingData } from "../types/marketing";

export function useMarketingData() {
  return useQuery<MarketingData, ApiError>({
    queryFn: getMarketingData,
    queryKey: ['marketingData'],
    staleTime: 1000 * 60 * 5,
  });
}
