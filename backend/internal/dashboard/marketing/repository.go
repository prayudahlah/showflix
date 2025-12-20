package marketing

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
	Get(ctx context.Context) (*GetResponse, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Get(ctx context.Context) (*GetResponse, error) {
	g, ctx := errgroup.WithContext(ctx)
	var mu sync.Mutex
	var resp GetResponse

	tasks := []func(context.Context) error{
		func(ctx context.Context) error {
			data, err := r.getProductionCompanies(ctx)
			if err != nil {
				return fmt.Errorf("production companies: %w", err)
			}
			mu.Lock()
			resp.ProductionCompanies = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getMetrics(ctx)
			if err != nil {
				return fmt.Errorf("metrics: %w", err)
			}
			mu.Lock()
			resp.Metrics = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getChart1(ctx)
			if err != nil {
				return fmt.Errorf("chart1: %w", err)
			}
			mu.Lock()
			resp.Chart1 = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getChart2(ctx)
			if err != nil {
				return fmt.Errorf("chart2: %w", err)
			}
			mu.Lock()
			resp.Chart2 = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getChart3(ctx)
			if err != nil {
				return fmt.Errorf("chart3: %w", err)
			}
			mu.Lock()
			resp.Chart3 = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getChart4(ctx)
			if err != nil {
				return fmt.Errorf("chart4: %w", err)
			}
			mu.Lock()
			resp.Chart4 = *data
			mu.Unlock()
			return nil
		},
		func(ctx context.Context) error {
			data, err := r.getChart5(ctx)
			if err != nil {
				return fmt.Errorf("chart5: %w", err)
			}
			mu.Lock()
			resp.Chart5 = *data
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

func (r *repository) getProductionCompanies(ctx context.Context) (*[]ProductionCompanies, error) {
	query := `
		SELECT
			CompanyId,
			CompanyName
		FROM vw_ProductionCompanies
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	companies := make([]ProductionCompanies, 0, 10)

	for rows.Next() {
		var data ProductionCompanies

		err := rows.Scan(
			&data.CompanyId,
			&data.CompanyName,
		)

		if err != nil {
			return nil, err
		}

		companies = append(companies, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &companies, nil
}

func (r *repository) getMetrics(ctx context.Context) (*[]Metrics, error) {
	query := `
		SELECT
			CompanyId,
			CompanyShowCount,
			CompanyAverageRating,
			CompanyAveragePopularity,
			CompanyRank
		FROM vw_DashboardMetrics
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	metrics := make([]Metrics, 0, 10)

	for rows.Next() {
		var data Metrics

		err := rows.Scan(
			&data.CompanyId,
			&data.ShowCount,
			&data.AverageRating,
			&data.AveragePopularity,
			&data.Rank,
		)

		if err != nil {
			return nil, err
		}

		metrics = append(metrics, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &metrics, nil
}

func (r *repository) getChart1(ctx context.Context) (*[]Chart1, error) {
	query := `
		SELECT
			CompanyId,
			RegionName,
			TotalTitles
		FROM vw_Marketing_Chart1
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var dataset []Chart1

	for rows.Next() {
		var data Chart1

		err := rows.Scan(
			&data.CompanyId,
			&data.RegionName,
			&data.TotalTitles,
		)

		if err != nil {
			return nil, err
		}

		dataset = append(dataset, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &dataset, nil
}

func (r *repository) getChart2(ctx context.Context) (*[]Chart2, error) {
	query := `
		SELECT
			CompanyId,
			NetworkName,
			NetworkCount
		FROM vw_Marketing_Chart2
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dataset := make([]Chart2, 0, 100)

	for rows.Next() {
		var data Chart2

		err := rows.Scan(
			&data.CompanyId,
			&data.NetworkName,
			&data.NetworkCount,
		)

		if err != nil {
			return nil, err
		}

		dataset = append(dataset, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &dataset, nil
}

func (r *repository) getChart3(ctx context.Context) (*[]Chart3, error) {
	query := `
		SELECT
			CompanyId,
			PrimaryTitle,
			VoteCount,
			AverageRating,
			NewPopularity
		FROM vw_Marketing_Chart3
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dataset := make([]Chart3, 0, 10)

	for rows.Next() {
		var data Chart3

		err := rows.Scan(
			&data.CompanyId,
			&data.PrimaryTitle,
			&data.VoteCount,
			&data.AverageRating,
			&data.Popularity,
		)

		if err != nil {
			return nil, err
		}

		dataset = append(dataset, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &dataset, nil
}

func (r *repository) getChart4(ctx context.Context) (*[]Chart4, error) {
	query := `
		SELECT
			CompanyId,
			PrimaryTitle,
			GenreName
		FROM vw_Marketing_Chart4
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var dataset []Chart4

	for rows.Next() {
		var data Chart4

		err := rows.Scan(
			&data.CompanyId,
			&data.PrimaryTitle,
			&data.GenreName,
		)

		if err != nil {
			return nil, err
		}

		dataset = append(dataset, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &dataset, nil
}

func (r *repository) getChart5(ctx context.Context) (*[]Chart5, error) {
	query := `
		SELECT
			CompanyId,
			PrimaryTitle,
			NewPopularity
		FROM vw_Executive_Chart5
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dataset := make([]Chart5, 0, 100)

	for rows.Next() {
		var data Chart5

		err := rows.Scan(
			&data.CompanyId,
			&data.PrimaryTitle,
			&data.Popularity,
		)

		if err != nil {
			return nil, err
		}

		dataset = append(dataset, data)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return &dataset, nil
}
