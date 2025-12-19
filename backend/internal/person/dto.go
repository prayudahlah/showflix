package person

type GetResponseDTO struct {
  PersonDTO
	TitlePrincipals *[]TitlePrincipalDTO `json:"titlePrincipals,omitempty"`
	KnownTitles     *[]KnownTitleDTO     `json:"knownTitles,omitempty"`
}

type PersonDTO struct {
	PrimaryName *string `json:"primaryName,omitempty"`
	BirthYear   *int32  `json:"birthYear,omitempty"`
	DeathYear   *int32  `json:"deathYear,omitempty"`
	Age         *int32  `json:"age,omitempty"`
}

type TitlePrincipalDTO struct {
	PrimaryTitle *string `json:"primaryTitle,omitempty"`
	JobType      *string `json:"jobType,omitempty"`
}

type KnownTitleDTO struct {
	PrimaryTitle  *string  `json:"primaryTitle,omitempty"`
	AverageRating *float64 `json:"averageRating,omitempty"`
}
