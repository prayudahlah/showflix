export interface GetResponse {
  primaryTitle?: string;
  createdDate?: string;
  isAdult?: boolean;
  runtimeMinutes?: number;
  originalTitle?: string;
  averageRating?: number;
  popularityRank?: number;
  newPopularity?: number;
  overview?: string;
  firstAirDate?: string;
  networks?: Network[];
  productionCompanies?: ProductionCompany[];
  titleAkas?: TitleAka[];
  genres?: Genre[];
  principals?: Principal[];
  availableLanguages?: AvailableLanguage[];
  spokenLanguages?: SpokenLanguage[];
  topTitles: TopTitles[];
}

interface Network {
  networkName?: string;
}

interface ProductionCompany {
  companyName?: string;
}

interface TitleAka {
  altTitle?: string;
  languageId?: string;
}

interface Genre {
  genreName?: string;
}

interface Principal {
  primaryName?: string;
  jobType?: string;
}

interface AvailableLanguage {
  languageName?: string;
}

interface SpokenLanguage {
  languageName?: string;
}

interface TopTitles {
  primaryTitle?: string;
  averageRating?: number;
  popularityRank?: number;
}
