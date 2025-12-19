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
			data, err := r.getTitle(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return utils.ErrNotFound
				}

				return err
			}
			mu.Lock()
			resp.Title = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getFirstAirDate(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.FirstAirDate = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getNetworks(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.Networks = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getProductionCompanies(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.ProductionCompanies = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getTitleAkas(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.TitleAkas = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getGenres(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.Genres = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getPrincipals(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.Principals = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getAvailableLanguages(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.AvailableLanguages = data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getSpokenLanguages(ctx, id)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					return nil
				}
				return err
			}
			mu.Lock()
			resp.SpokenLanguages = data
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

func (r *repository) getTitle(ctx context.Context, id string) (*Title, error) {
	query := `EXEC sp_Show_Titles @id = @titleId;`

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
		return nil, err
	}

	return &t, nil
}

func (r *repository) getFirstAirDate(ctx context.Context, id string) (*FirstAirDate, error) {
	query := `EXEC sp_Show_TitlesAirDates @id = @titleId;`

	row := r.db.QueryRowContext(ctx, query, sql.Named("titleId", id))

	var fad FirstAirDate

	err := row.Scan(
		&fad.TitleId,
		&fad.Date,
	)

	if err != nil {
		return nil, err
	}

	return &fad, nil
}

func (r *repository) getNetworks(ctx context.Context, id string) (*[]Network, error) {
	query := `EXEC sp_Show_TitlesNetworks @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var networks []Network

	for rows.Next() {
		var n Network

		err := rows.Scan(
			&n.TitleId,
			&n.NetworkName,
		)

		if err != nil {
			return nil, err
		}

		networks = append(networks, n)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &networks, nil
}

func (r *repository) getProductionCompanies(ctx context.Context, id string) (*[]ProductionCompany, error) {
	query := `EXEC sp_Show_TitlesProductionCompanies @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var productionCompanies []ProductionCompany

	for rows.Next() {
		var pc ProductionCompany

		err := rows.Scan(
			&pc.TitleId,
			&pc.CompanyName,
		)

		if err != nil {
			return nil, err
		}

		productionCompanies = append(productionCompanies, pc)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &productionCompanies, nil
}

func (r *repository) getTitleAkas(ctx context.Context, id string) (*[]TitleAka, error) {
	query := `EXEC sp_Show_TitlesTitleAkas @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var titleAkas []TitleAka

	for rows.Next() {
		var ta TitleAka

		err := rows.Scan(
			&ta.TitleId,
			&ta.AltTitle,
			&ta.LanguageId,
		)

		if err != nil {
			return nil, err
		}

		titleAkas = append(titleAkas, ta)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &titleAkas, nil
}

func (r *repository) getGenres(ctx context.Context, id string) (*[]Genre, error) {
	query := `EXEC sp_Show_TitlesGenres @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var genres []Genre

	for rows.Next() {
		var g Genre

		err := rows.Scan(
			&g.TitleId,
			&g.GenreName,
		)

		if err != nil {
			return nil, err
		}

		genres = append(genres, g)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &genres, nil
}

func (r *repository) getPrincipals(ctx context.Context, id string) (*[]Principal, error) {
	query := `EXEC sp_Show_TitlesPrincipals @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var principals []Principal

	for rows.Next() {
		var p Principal

		err := rows.Scan(
			&p.TitleId,
			&p.PrimaryName,
			&p.JobType,
		)

		if err != nil {
			return nil, err
		}

		principals = append(principals, p)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &principals, nil
}

func (r *repository) getAvailableLanguages(ctx context.Context, id string) (*[]AvailableLanguage, error) {
	query := `EXEC sp_Show_TitlesAvailableLanguages @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var availableLanguages []AvailableLanguage

	for rows.Next() {
		var al AvailableLanguage

		err := rows.Scan(
			&al.TitleId,
			&al.LanguageName,
		)

		if err != nil {
			return nil, err
		}

		availableLanguages = append(availableLanguages, al)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &availableLanguages, nil
}

func (r *repository) getSpokenLanguages(ctx context.Context, id string) (*[]SpokenLanguage, error) {
	query := `EXEC sp_Show_TitlesSpokenLanguages @id = @titleId;`

	rows, err := r.db.QueryContext(ctx, query, sql.Named("titleId", id))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var spokenLanguages []SpokenLanguage

	for rows.Next() {
		var al SpokenLanguage

		err := rows.Scan(
			&al.TitleId,
			&al.LanguageName,
		)

		if err != nil {
			return nil, err
		}

		spokenLanguages = append(spokenLanguages, al)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &spokenLanguages, nil
}
