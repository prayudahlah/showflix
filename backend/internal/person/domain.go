package person

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
}](items *[]T) *[]D {
	if items == nil || len(*items) == 0 {
		return nil
	}
	
	dtos := make([]D, 0, len(*items))
	for i := range *items {
		var ptr PT = &(*items)[i]
		dtos = append(dtos, *ptr.ToDTO())
	}
	return &dtos
}

type GetResponse struct {
  Person          Person
	TitlePrincipals *[]TitlePrincipal
	KnownTitles     *[]KnownTitle
}

func (gr *GetResponse) ToDTO() *GetResponseDTO {
	return &GetResponseDTO {
		PersonDTO:       *gr.Person.ToDTO(),
		TitlePrincipals: toSliceDTO[TitlePrincipal, TitlePrincipalDTO](gr.TitlePrincipals),
		KnownTitles:     toSliceDTO[KnownTitle, KnownTitleDTO](gr.KnownTitles),
	}
}

type Person struct {
	PersonId    string         `db:"PersonId"`
	PrimaryName sql.NullString `db:"PrimaryName"`
	BirthYear   sql.NullInt32  `db:"BirthYear"`
	DeathYear   sql.NullInt32  `db:"DeathYear"`
	Age         sql.NullInt32  `db:"Age"`
}

func (p *Person) ToDTO() *PersonDTO {
	return &PersonDTO {
		PrimaryName: utils.ToStringPtr(p.PrimaryName),
		BirthYear:   utils.ToInt32Ptr(p.BirthYear),
		DeathYear:   utils.ToInt32Ptr(p.DeathYear),
		Age:         utils.ToInt32Ptr(p.Age),
	}
}

type TitlePrincipal struct {
	PersonId     string         `db:"PersonId"`
	PrimaryTitle sql.NullString `db:"PrimaryTitle"`
	JobType      sql.NullString `db:"JobType"`
}

func (tp *TitlePrincipal) ToDTO() *TitlePrincipalDTO {
	return &TitlePrincipalDTO {
		PrimaryTitle: utils.ToStringPtr(tp.PrimaryTitle),
		JobType: utils.ToStringPtr(tp.JobType),
	}
}

type KnownTitle struct {
	PersonId      string          `db:"PersonId"`
	PrimaryTitle  sql.NullString  `db:"PrimaryTitle"`
	AverageRating sql.NullFloat64 `db:"AverageRating"`
}

func (kt *KnownTitle) ToDTO() *KnownTitleDTO {
	return &KnownTitleDTO {
		PrimaryTitle: utils.ToStringPtr(kt.PrimaryTitle),
		AverageRating: utils.ToFloat64Ptr(kt.AverageRating),
	}
}
