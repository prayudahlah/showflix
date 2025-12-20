package person

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"golang.org/x/sync/errgroup"
	"database/sql"
	"context"
	"errors"
	"sync"
)

type Repository interface {
	Get(ctx context.Context, id string) (*GetResponse, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Get(ctx context.Context, id string) (*GetResponse, error) {
	g, ctx := errgroup.WithContext(ctx)
	var mu sync.Mutex
	var resp GetResponse

	tasks := []func(context.Context) error{
		func(ctx context.Context) error {
			data, err := r.getPerson(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return utils.ErrNotFound
				}

				return err
			}
			mu.Lock()
			resp.Person = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getTitlePrincipals(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.TitlePrincipals = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getKnownTitles(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.KnownTitles = data
			mu.Unlock()
			return nil
		},
	}

	for _, task := range tasks {
		t := task
		g.Go(func() error {
			return t(ctx)
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	return &resp, nil
}

func (r *repository) getPerson(ctx context.Context, id string) (*Person, error) {
	query := `EXEC sp_Person_Persons @id = @personId;`

	row := r.db.QueryRowContext(ctx, query, sql.Named("personId", id))

	var p Person

	err := row.Scan(
		&p.PersonId,
		&p.PrimaryName,
		&p.BirthYear,
		&p.DeathYear,
		&p.Age,
	)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

func (r *repository) getTitlePrincipals(ctx context.Context, id string) (*[]TitlePrincipal, error) {
	query := `EXEC sp_Person_PersonsTitlePrincipals @id = @personId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("personId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var titlePrincipals []TitlePrincipal

	for rows.Next() {
		var tp TitlePrincipal

		err := rows.Scan(
			&tp.PersonId,
			&tp.PrimaryTitle,
			&tp.JobType,
		)

		if err != nil {
			return nil, err
		}

		titlePrincipals = append(titlePrincipals, tp)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &titlePrincipals, nil
}

func (r *repository) getKnownTitles(ctx context.Context, id string) (*[]KnownTitle, error) {
	query := `EXEC sp_Person_PersonsPersonKnownTitles @id = @personId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("personId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var knownTitles []KnownTitle

	for rows.Next() {
		var kt KnownTitle

		err := rows.Scan(
			&kt.PersonId,
			&kt.PrimaryTitle,
			&kt.AverageRating,
		)

		if err != nil {
			return nil, err
		}

		knownTitles = append(knownTitles, kt)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &knownTitles, nil
}
