export interface SearchPersonRequest {
  searchTerm?: string;
  profession?: string;
  birthDateMin?: number;
  birthDateMax?: number;
  deathDateMin?: number;
  deathDateMax?: number;
  SortDirection?: string;
  cursorValue?: number;
  CursorPersonId?: string;
  PageSize?: number;
}

export interface SearchPersonResponse {
  searchPersons?: searchPerson[];
  cursor: cursor;
}

interface searchPerson {
  personId: string;
  popularity?: number;
  primaryName?: string;
  profession?: string;
  birthYear?: number;
  deathYear?: number;
}

interface cursor {
  nextCursorValue?: number;
  nextCursorPersonId?: number;
  hasMode: boolean;
}
