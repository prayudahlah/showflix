import { api } from "./apiInstance";
import type { ExecutiveData } from "../types/executive";

export async function getExecutiveData(): Promise<ExecutiveData> {
  const res = await api.get<ExecutiveData>("dashboard/executive");
  return res.data
}
