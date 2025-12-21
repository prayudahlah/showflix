package searchPerson

type PostResponseDTO struct {
	SearchPersons []SearchPersonDTO `json:"searchPersons"`
	Cursor        CursorDTO        `json:"cursor"`
}

type SearchPersonDTO struct {
	PersonId    string   `json:"personId"`
	Popularity  *float64 `json:"popularity,omitempty"`
	PrimaryName *string  `json:"primaryName,omitempty"`
	Profession  *string  `json:"profession,omitempty"`
	BirthYear   *int32   `json:"birthYear,omitempty"`
	DeathYear   *int32   `json:"deathYear,omitempty"`
	Age         *int32   `json:"age,omitempty"`
}

type CursorDTO struct {
	NextCursorValue   *float64 `json:"nextCursorValue,omitempty"`
	NextCursorPersonId *string  `json:"nextCursorPersonId,omitempty"`
	HasMore           bool     `json:"hasMore"`
}
