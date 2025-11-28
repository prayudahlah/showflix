package title

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
	Title               Title
	FirstAirDate        *FirstAirDate
	Networks            *[]Network
	ProductionCompanies *[]ProductionCompany
	TitleAkas           *[]TitleAka
	Genres              *[]Genre
	Principals          *[]Principal
}

func (gr *GetResponse) ToDTO() *GetResponseDTO {
	var firstAirDateDTO *FirstAirDateDTO
	if gr.FirstAirDate != nil {
		firstAirDateDTO = gr.FirstAirDate.ToDTO()
	}
	
	return &GetResponseDTO {
		TitleDTO:            *gr.Title.ToDTO(),
		FirstAirDateDTO:     firstAirDateDTO,
		Networks:            toSliceDTO[Network, NetworkDTO](gr.Networks),
		ProductionCompanies: toSliceDTO[ProductionCompany, ProductionCompanyDTO](gr.ProductionCompanies),
		TitleAkas:           toSliceDTO[TitleAka, TitleAkaDTO](gr.TitleAkas),
		Genres:              toSliceDTO[Genre, GenreDTO](gr.Genres),
		Principals:          toSliceDTO[Principal, PrincipalDTO](gr.Principals),
	}
}

type Title struct {
	TitleId        string          `db:"TitleId"`
	PrimaryTitle   sql.NullString  `db:"PrimaryTitle"`
	CreatedDate    sql.NullTime    `db:"CreatedDate"`
	IsAdult        sql.NullBool    `db:"IsAdult"`
	RuntimeMinutes sql.NullInt32   `db:"RuntimeMinutes"`
	OriginalTitle  sql.NullString  `db:"OriginalTitle"`
	AverageRating  sql.NullFloat64 `db:"AverageRating"`
	PopularityRank sql.NullInt32   `db:"PopularityRank"`
	NewPopularity  sql.NullFloat64 `db:"NewPopularity"`
	Overview       sql.NullString  `db:"Overview"`
}

func (t *Title) ToDTO() *TitleDTO {
	return &TitleDTO {
		PrimaryTitle:   utils.ToStringPtr(t.PrimaryTitle),
		CreatedDate:    utils.ToTimePtr(t.CreatedDate),
		IsAdult:        utils.ToBoolPtr(t.IsAdult),
		RuntimeMinutes: utils.ToInt32Ptr(t.RuntimeMinutes),
		OriginalTitle:  utils.ToStringPtr(t.OriginalTitle),
		AverageRating:  utils.ToFloat64Ptr(t.AverageRating),
		PopularityRank: utils.ToInt32Ptr(t.PopularityRank),
		NewPopularity:  utils.ToFloat64Ptr(t.NewPopularity),
		Overview:       utils.ToStringPtr(t.Overview),
	}
}

type FirstAirDate struct {
	TitleId string       `db:"TitleId"`
	Date    sql.NullTime `db:"Date"`
}

func (fad *FirstAirDate) ToDTO() *FirstAirDateDTO {
	return &FirstAirDateDTO{
		Date: utils.ToTimePtr(fad.Date),
	}
}

type Network struct {
	TitleId     string         `db:"TitleId"`
	NetworkName sql.NullString `db:"NetworkName"`
}

func (n *Network) ToDTO() *NetworkDTO {
	return &NetworkDTO{
		NetworkName: utils.ToStringPtr(n.NetworkName),
	}
}

type ProductionCompany struct {
	TitleId     string         `db:"TitleId"`
	CompanyName sql.NullString `db:"CompanyName"`
}

func (pc *ProductionCompany) ToDTO() *ProductionCompanyDTO {
	return &ProductionCompanyDTO{
		CompanyName: utils.ToStringPtr(pc.CompanyName),
	}
}

type TitleAka struct {
	TitleId    string         `db:"TitleId"`
	AltTitle   sql.NullString `db:"AltTitle"`
	LanguageId sql.NullString `db:"LanguageId"`
}

func (ta *TitleAka) ToDTO() *TitleAkaDTO {
	return &TitleAkaDTO{
		AltTitle:   utils.ToStringPtr(ta.AltTitle),
		LanguageId: utils.ToStringPtr(ta.LanguageId),
	}
}

type Genre struct {
	TitleId   string         `db:"TitleId"`
	GenreName sql.NullString `db:"GenreName"`
}

func (g *Genre) ToDTO() *GenreDTO {
	return &GenreDTO{
		GenreName: utils.ToStringPtr(g.GenreName),
	}
}

type Principal struct {
	TitleId      string         `db:"TitleId"`
	PrimaryName  sql.NullString `db:"PrimaryName"`
	JobType      sql.NullString `db:"JobType"`
}

func (p *Principal) ToDTO() *PrincipalDTO {
	return &PrincipalDTO{
		PrimaryName: utils.ToStringPtr(p.PrimaryName),
		JobType:     utils.ToStringPtr(p.JobType),
	}
}

type TitleAvailableLanguage struct {
    TitleId      sql.NullString `db:"TitleId"`
    LanguageName sql.NullString `db:"LanguageName"`
}

type TitleSpokenLanguage struct {
    TitleId      sql.NullString `db:"TitleId"`
    LanguageName sql.NullString `db:"LanguageName"`
}
