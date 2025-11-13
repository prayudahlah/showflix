package executive

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
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
	var (
		wg        sync.WaitGroup
		mu        sync.Mutex
		response  GetResponse
		errChan   = make(chan error, 5)
	)

	tasks := []func(){
		func() {
			data, err := r.getTop10Companies(ctx)
			if err != nil {
				errChan <- fmt.Errorf("top10: %w", err)
				return
			}
			mu.Lock()
			response.Top10Companies = *data
			mu.Unlock()
		},
		func() {
			data, err := r.getChart1(ctx)
			if err != nil {
				errChan <- fmt.Errorf("chart1: %w", err)
				return
			}
			mu.Lock()
			response.Chart1 = *data
			mu.Unlock()
		},
	}

	for _, t := range tasks {
		wg.Add(1)
		go func(task func()) {
			defer wg.Done()
			task()
		}(t)
	}

	go func() {
		wg.Wait()
		close(errChan)
	}()

	for err := range errChan {
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, utils.ErrNotFound
			}

			return nil, err
		}
	}

	return &response, nil
}

func (r *repository) getTop10Companies(ctx context.Context) (*[]Top10Companies, error) {
	query := `
		SELECT
			CompanyId,
			CompanyName
		FROM vw_Executive_Top10Companies
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	var companies []Top10Companies

	for rows.Next() {
		var data Top10Companies

		err := rows.Scan(
			&data.CompanyId,
			&data.CompanyName,
		)

		if err != nil {
			return nil, err
		}

		companies = append(companies, data)
	}

	return &companies, nil
}

func (r *repository) getChart1(ctx context.Context) (*[]Chart1, error) {
	query := `
		SELECT
			CompanyId,
			YearAired,
			TitleCount
		FROM vw_Executive_Chart1
	`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	var dataset []Chart1

	for rows.Next() {
		var data Chart1

		err := rows.Scan(
			&data.CompanyId,
			&data.YearAired,
			&data.TitleCount,
		)

		if err != nil {
			return nil, err
		}

		dataset = append(dataset, data)
	}

	return &dataset, nil
}
