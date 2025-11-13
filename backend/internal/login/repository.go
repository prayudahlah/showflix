package login

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"database/sql"
	"context"
	"errors"
)

type Repository interface {
	GetByUsername(ctx context.Context, username string) (*Role, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db: db}
}

func (r *repository) GetByUsername(ctx context.Context, username string) (*Role, error) {
	query := `
		SELECT
			r.RoleName,
			r.Username,
			r.Salt,
			r.HashedPassword
		FROM ROLE r
		WHERE r.Username = @username
	`

	row := r.db.QueryRowContext(ctx, query, sql.Named("username", username))

	var role Role

	err := row.Scan(
		&role.RoleName,
		&role.Username,
		&role.Salt,
		&role.HashedPassword,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, utils.ErrUnauthorized
		}

		return nil, err
	}
	return &role, nil
}
