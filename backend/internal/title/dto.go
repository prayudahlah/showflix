package title

type GetResponseDTO struct {
	Title TitleDTO `json:"title"`
	FirstAirDate FirstAirDateDTO `json:"firstAirDate"`
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
	Date *string `json:"date,omitempty"`
}

type NameDTO struct {
    Name *string `json:"name,omitempty"`
}

type AkaDTO struct {
    AltTitle   *string `json:"altTitle,omitempty"`
    LanguageId *string `json:"languageId,omitempty"`
}

type PrincipalDTO struct {
    PrimaryName *string `json:"primaryName,omitempty"`
    JobTypeId   *int32  `json:"jobTypeId,omitempty"`
}
