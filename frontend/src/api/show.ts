import { api } from "./apiInstance";
import type { GetResponse } from "../types/show.ts";

export async function getShowById(id: string): Promise<GetResponse> {
  const res = await api.get<GetResponse>(`title/${id}`);
  return res.data
}
