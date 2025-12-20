import { api } from "./apiInstance";
import type { GetResponse } from "../types/person.ts";

export async function getPersonById(id: string): Promise<GetResponse> {
  const res = await api.get<GetResponse>(`person/${id}`);
  return res.data
}
