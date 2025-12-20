import { api } from "./apiInstance";
import type { SearchShowRequest, SearchShowResponse } from "../types/searchShow";

export async function postSearchShow(data: SearchShowRequest): Promise<SearchShowResponse> {
  const res = await api.post("search/title", data);
  return res.data
}
