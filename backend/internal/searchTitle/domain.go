package searchTitle

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"database/sql"
)

type DTOConverter[D any] interface {
	ToDTO() *D
}

func toSliceDTO[T any, D any, PT interface {
	*T
	DTOConverter[D]
}](items []T) []D {
	if items == nil || len(items) == 0 {
		return nil
	}
	
	dtos := make([]D, 0, len(items))
	for i := range items {
		var ptr PT = &items[i]
		dtos = append(dtos, *ptr.ToDTO())
	}
	return dtos
}

type PostResponse struct {
	SearchTitles []SearchTitle
	Cursor       Cursor
}

func (pr *PostResponse) ToDTO() *PostResponseDTO {
	return &GetResponseDTO {
		SearchTitles: toSliceDTO[SearchTitle, SearchTitleDTO](pr.SearchTitle),
		Cursor: pr.Cursor.toDTO,
	}
}

type SearchTitle struct {
	TitleId        string          `db:"TitleId"`
	PrimaryTitle   string          `db:"PrimaryTitle"`
	StartYear      sql.NullInt32   `db:"StartYear"`
	AverageRating  sql.NullFloat64 `db:"AverageRating"`
	RuntimeMinutes sql.NullInt32   `db:"RuntimeMinutes"`
	IsAdult        sql.NullBool    `db:"IsAdult"`
	GenreName      sql.NullString  `db:"GenreName"`
	Popularity     sql.NullFloat64 `db:"NewPopularity"`
}

func (st *SearchTitle) ToDTO() *SearchTitleDTO {
	return &SearchTitleDTO{
		PrimaryTitle:   st.PrimaryTitle,
		StartYear:      utils.ToInt32Ptr(st.StartYear),
		AverageRating:  utils.ToFloat64Ptr(st.AverageRating),
		RuntimeMinutes: utils.ToInt32Ptr(st.RuntimeMinutes),
		IsAdult:        utils.ToBoolPtr(st.IsAdult),
		GenreName:      utils.ToStringPtr(st.GenreName),
		Popularity:     utils.ToFloat64Ptr(st.Popularity),
	}
}

type Cursor struct {
	NextCursorValue   sql.NullFloat64 `db:"NextCursorValue"`
	NextCursorTitleId sql.NullFloat64 `db:"NextCursorTitleId"`
	HasMore           bool            `db:"HasMore"`
}

func (c *Cursor) ToDTO() *CursorDTO {
	return &CursorDTO{
		NextCursorValue:   utils.ToFloat64Ptr(c.NextCursorValue),
		NextCursorTitleId: utils.ToFloat64Ptr(c.NextCursorTitleId),
		HasMore:           c.HasMore,
	}
}
