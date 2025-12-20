package searchTitle

type PostResponseDTO struct {
	SearchTitles []SearchTitleDTO `json:"searchTitles"`
	Cursor       CursorDTO        `json:"cursor"`
}

type SearchTitleDTO struct {
	TitleId        string   `json:"titleId"`
	PrimaryTitle   string   `json:"primaryTitle"`
	StartYear      *int32   `json:"startYear,omitempty"`
	AverageRating  *float64 `json:"averageRating,omitempty"`
	RuntimeMinutes *int32   `json:"runtimeMinutes,omitempty"`
	IsAdult        *bool    `json:"isAdult,omitempty"`
	GenreName      *string  `json:"genreName,omitempty"`
	Popularity     *float64 `json:"popularity,omitempty"`
}

type CursorDTO struct {
	NextCursorValue   *float64 `json:"nextCursorValue,omitempty"`
	NextCursorTitleId *string  `json:"nextCursorTitleId,omitempty"`
	HasMore           bool     `json:"hasMore"`
}
