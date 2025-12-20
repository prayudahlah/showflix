package searchTitle

import (
	"database/sql"
)

type PostResponseDTO struct {
	SearchTitles []SearchTitleDTO `json:"searchTitles"`
	Cursor       CursorDTO        `json:"cursor"`
}

type SearchTitleDTO struct {
	TitleId        string          `json:"titleId"`
	PrimaryTitle   string          `json:"primaryTitle"`
	StartYear      sql.NullInt32   `json:"startYear,omitempty"`
	AverageRating  sql.NullFloat64 `json:"averageRating,omitempty"`
	RuntimeMinutes sql.NullInt32   `json:"runtimeMinutes,omitempty"`
	IsAdult        sql.NullBool    `json:"isAdult,omitempty"`
	GenreName      sql.NullString  `json:"genreName,omitempty"`
	Popularity     sql.NullFloat64 `json:"popularity,omitempty"`
}

type CursorDTO struct {
	NextCursorValue   sql.NullFloat64 `json:"nextCursorValue,omitempty"`
	NextCursorTitleId sql.NullFloat64 `json:"nextCursorTitleId,omitempty"`
	HasMore           bool            `json:"hasMore"`
}
