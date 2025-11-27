package title

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"database/sql"
)

type GetResponse struct {
	Title Title
	FirstAirDate FirstAirDate
}

func (gr *GetResponse) ToDTO() *GetResponseDTO {
	return &GetResponseDTO {
		Title:        *gr.Title.ToDTO(),
		FirstAirDate: *gr.FirstAirDate.ToDTO(),
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

type TitleNetwork struct {
    TitleId     sql.NullString `db:"TitleId"`
    NetworkName sql.NullString `db:"NetworkName"`
}

type TitleProductionCompany struct {
    TitleId     sql.NullString `db:"TitleId"`
    CompanyName sql.NullString `db:"CompanyName"`
}

type TitleAka struct {
    TitleId    sql.NullString `db:"TitleId"`
    AltTitle   sql.NullString `db:"AltTitle"`
    LanguageId sql.NullString `db:"LanguageId"`
}

type TitleGenre struct {
    TitleId   sql.NullString `db:"TitleId"`
    GenreName sql.NullString `db:"GenreName"`
}

type TitlePrincipal struct {
    TitleId      sql.NullString `db:"TitleId"`
    PrimaryName  sql.NullString `db:"PrimaryName"`
    JobTypeId    sql.NullInt32  `db:"JobTypeId"`
}

type TitleAvailableLanguage struct {
    TitleId      sql.NullString `db:"TitleId"`
    LanguageName sql.NullString `db:"LanguageName"`
}

type TitleSpokenLanguage struct {
    TitleId      sql.NullString `db:"TitleId"`
    LanguageName sql.NullString `db:"LanguageName"`
}
