package searchPerson

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
	SearchPersons []SearchPerson
	Cursor       Cursor
}

func (pr *PostResponse) ToDTO() *PostResponseDTO {
	return &PostResponseDTO {
		SearchPersons: toSliceDTO[SearchPerson, SearchPersonDTO](pr.SearchPersons),
		Cursor:        *pr.Cursor.ToDTO(),
	}
}

type SearchPerson struct {
	PersonId    string          `db:"PersonId"`
	Popularity  sql.NullFloat64 `db:"Popularity"`
	PrimaryName sql.NullString  `db:"PrimaryName"`
	Profession  sql.NullString  `db:"Profession"`
	BirthYear   sql.NullInt32   `db:"BirthYear"`
	DeathYear   sql.NullInt32   `db:"DeathYear"`
}

func (st *SearchPerson) ToDTO() *SearchPersonDTO {
	return &SearchPersonDTO{
		PersonId:    st.PersonId,
		Popularity:  utils.ToFloat64Ptr(st.Popularity),
		PrimaryName: utils.ToStringPtr(st.PrimaryName),
		Profession:  utils.ToStringPtr(st.Profession),
		BirthYear:   utils.ToInt32Ptr(st.BirthYear),
		DeathYear:   utils.ToInt32Ptr(st.DeathYear),
	}
}

type Cursor struct {
	NextCursorValue    sql.NullFloat64 `db:"NextCursorValue"`
	NextCursorPersonId sql.NullString  `db:"NextCursorPersonId"`
	HasMore            bool            `db:"HasMore"`
}

func (c *Cursor) ToDTO() *CursorDTO {
	return &CursorDTO{
		NextCursorValue:   utils.ToFloat64Ptr(c.NextCursorValue),
		NextCursorPersonId: utils.ToStringPtr(c.NextCursorPersonId),
		HasMore:           c.HasMore,
	}
}
