import { api } from "./apiInstance";
import type { SearchPersonRequest, SearchPersonResponse } from "../types/searchPerson";

export async function postSearchPerson(data: SearchPersonRequest): Promise<SearchPersonResponse> {
  const res = await api.post("search/person", data);
  return res.data
}
