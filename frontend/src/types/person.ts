export interface GetResponse {
  primaryName?: string;
  birthYear?: number;
  deathYear?: number;
  age?: number;
  titlePrincipals?: TitlePrincipal[];
  knownTitles?: KnownTitle[];
}

interface TitlePrincipal {
  primaryTitle?: string;
  jobType?: string;
}

interface KnownTitle {
  primaryTitle?: string;
  averageRating?: number;
}
