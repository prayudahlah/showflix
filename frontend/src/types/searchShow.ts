export interface SearchShowRequest {
  searchTerm?: string;
  ratingMin?: number;
  ratingMax?: number;
  genre?: string;
  runtimeMin?: number;
  runtimeMax?: number;
  isAdult?: boolean;
  year?: number;
  sortBy?: string;
  sortDirection?: string;
  cursorValue?: number;
  cursorTitleId?: string;
  pageSize?: number;
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
  nextCursorTitleId?: string;
  hasMore: boolean;
}
