package persons

import (
	"database/sql"
)

type Person struct {
	PersonID     string         `db:"PersonId"`
	PrimaryName  string         `db:"PrimaryName"`
	BirthYear    sql.NullInt32  `db:"BirthYear"`
	DeathYear    sql.NullInt32  `db:"DeathYear"`
}
