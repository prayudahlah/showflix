export interface SearchShowRequest {
  searchTerm?: string;
  ratingMin?: number;
  ratingMax?: number;
  genre?: string;
  RuntimeMin?: number;
  runtimeMax?: number;
  isAdult?: boolean;
  year?: number;
  SortBy?: string;
  SortDirection?: string;
  cursorValue?: number;
  CursorTitleId?: string;
  PageSize?: number;
}

export interface SearchShowResponse {
  searchTitles?: searchTitle[];
  cursor: cursor;
}

interface searchTitle {
  titleId: string;
  primaryTitle?: string;
  startYear?: number;
  averageRating?: number;
  runtimeMinutes?: number;
  isAdult: boolean;
  genreName?: string;
  popularity?: number;
}

interface cursor {
  nextCursorValue?: number;
  nextCursorTitleId?: number;
  hasMode: boolean;
}
