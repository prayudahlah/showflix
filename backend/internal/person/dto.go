package person

type GetResponseDTO struct {
  TitleDTO
  *FirstAirDateDTO    `json:",omitempty"`
	Networks            *[]NetworkDTO           `json:"networks,omitempty"`
	ProductionCompanies *[]ProductionCompanyDTO `json:"productionCompanies,omitempty"`
	TitleAkas           *[]TitleAkaDTO          `json:"titleAkas,omitempty"`
	Genres              *[]GenreDTO             `json:"genres,omitempty"`
	Principals          *[]PrincipalDTO         `json:"principals,omitempty"`
	AvailableLanguages  *[]AvailableLanguageDTO `json:"availableLanguages,omitempty"`
	SpokenLanguages     *[]SpokenLanguageDTO    `json:"spokenLanguages,omitempty"`
}

type TitleDTO struct {
	PrimaryTitle   *string  `json:"primaryTitle,omitempty"`
	CreatedDate    *string  `json:"createdDate,omitempty"`
	IsAdult        *bool    `json:"isAdult,omitempty"`
	RuntimeMinutes *int32   `json:"runtimeMinutes,omitempty"`
	OriginalTitle  *string  `json:"originalTitle,omitempty"`
	AverageRating  *float64 `json:"averageRating,omitempty"`
	PopularityRank *int32   `json:"popularityRank,omitempty"`
	NewPopularity  *float64 `json:"newPopularity,omitempty"`
	Overview       *string  `json:"overview,omitempty"`
}

type FirstAirDateDTO struct {
	Date *string `json:"firstAirDate,omitempty"`
}

type NetworkDTO struct {
	NetworkName *string `json:"networkName,omitempty"`
}

type ProductionCompanyDTO struct {
	CompanyName *string `json:"companyName,omitempty"`
}

type TitleAkaDTO struct {
    AltTitle   *string `json:"altTitle,omitempty"`
    LanguageId *string `json:"languageId,omitempty"`
}

type GenreDTO struct {
	GenreName *string `json:"genreName,omitempty"`
}

type PrincipalDTO struct {
	PrimaryName *string `json:"primaryName,omitempty"`
	JobType     *string `json:"jobType,omitempty"`
}

type AvailableLanguageDTO struct {
    LanguageName *string `json:"languageName,omitempty"`
}

type SpokenLanguageDTO struct {
    LanguageName *string `json:"languageName,omitempty"`
}
