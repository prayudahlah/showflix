import type { MarketingData } from "../types/marketing";
import { api } from "./apiInstance";

export async function getMarketingData(): Promise<MarketingData> {
  const res = await api.get<MarketingData>("dashboard/marketing");
  return res.data
}
