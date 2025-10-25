package persons

import (
	"database/sql"
	"context"
)

type PersonRepo interface {
	GetByID(ctx context.Context, id string) (*Person, error)
	// Create(person Person) error
}

type personRepo struct {
	db *sql.DB
}

func NewRepo(db *sql.DB) PersonRepo {
	return &personRepo{db: db}
}

func (r *personRepo) GetByID(ctx context.Context, id string) (*Person, error) {
	query := `
		SELECT
			p.PersonId,
			p.PrimaryName,
			p.BirthYear,
			p.DeathYear 
		FROM PERSONS p
		WHERE p.PersonId = @personId
	`

	row := r.db.QueryRowContext(ctx, query, sql.Named("personId", id))

	var p Person

	err := row.Scan(
		&p.PersonID,
		&p.PrimaryName,
		&p.BirthYear,
		&p.DeathYear,
	)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

// func (r *personRepo) Create(person Person) error {
//
// }
