package title

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"golang.org/x/sync/errgroup"
	"database/sql"
	"context"
	"errors"
	"sync"
	"fmt"
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
			data, err := r.getTitle(ctx, id)
			if err != nil {
				return fmt.Errorf("Title: %w", err)
			}
			mu.Lock()
			resp.Title = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getFirstAirDate(ctx, id)
			if err != nil {
				return fmt.Errorf("Air Date: %w", err)
			}
			mu.Lock()
			resp.FirstAirDate = *data
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
		if errors.Is(err, sql.ErrNoRows) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}

	return &resp, nil
}

func (r *repository) getTitle(ctx context.Context, id string) (*Title, error) {
	query := `EXEC sp_Show_Titles @id = @titleId`

	row := r.db.QueryRowContext(ctx, query, sql.Named("titleId", id))

	var t Title

	err := row.Scan(
		&t.TitleId,
		&t.PrimaryTitle,
		&t.CreatedDate,
		&t.IsAdult,
		&t.RuntimeMinutes,
		&t.OriginalTitle,
		&t.AverageRating,
		&t.PopularityRank,
		&t.NewPopularity,
		&t.Overview,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, utils.ErrNotFound
		}

		return nil, err
	}

	return &t, nil
}

func (r *repository) getFirstAirDate(ctx context.Context, id string) (*FirstAirDate, error) {
	query := `EXEC sp_Show_TitlesAirDates @id = @titleId`

	row := r.db.QueryRowContext(ctx, query, sql.Named("titleId", id))

	var fad FirstAirDate

	err := row.Scan(
		&fad.TitleId,
		&fad.Date,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, utils.ErrNotFound
		}

		return nil, err
	}

	return &fad, nil
}
