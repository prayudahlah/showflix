package searchTitle

import (
	"database/sql"
	"context"
)

type Repository interface {
	Search(ctx context.Context, req RequestBody) (*PostResponse, error)
}

type repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Search(ctx context.Context, req RequestBody) (*PostResponse, error) {
	query := `
	EXEC sp_Landing_Titles
		@SearchTerm = @searchTerm,
		@RatingMin = @ratingMin,
		@RatingMax = @ratingMax,
		@Genre = @genre,
		@RuntimeMin = @runtimeMin,
		@RuntimeMax = @runtimeMax,
		@IsAdult = @isAdult,
		@CompanyId = @companyId,
		@Year = @year,
		@SortBy = @sortBy,
		@SortDirection = @sortDirection,
		@CursorValue = @cursorValue,
		@CursorTitleId = @cursorTitleId,
		@PageSize = @pageSize
	`

	rows, err := r.db.QueryContext(ctx, query,
		sql.Named("searchTerm",    req.SearchTerm),
		sql.Named("ratingMin",     req.RatingMin),
		sql.Named("ratingMax",     req.RatingMax),
		sql.Named("genre",         req.Genre),
		sql.Named("runtimeMin",    req.RuntimeMin),
		sql.Named("runtimeMax",    req.RuntimeMax),
		sql.Named("isAdult",       req.IsAdult),
		sql.Named("year",          req.Year),
		sql.Named("companyId",     req.CompanyId),
		sql.Named("sortBy",        req.SortBy),
		sql.Named("sortDirection", req.SortDirection),
		sql.Named("cursorValue",   req.CursorValue),
		sql.Named("cursorTitleId", req.CursorTitleId),
		sql.Named("pageSize",      req.PageSize),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var searchTitles []SearchTitle

	for rows.Next() {
		var st SearchTitle

		err := rows.Scan(
			&st.TitleId,
			&st.PrimaryTitle,
			&st.StartYear,
			&st.AverageRating,
			&st.RuntimeMinutes,
			&st.IsAdult,
			&st.GenreName,
			&st.Popularity,
		)

		if err != nil {
			return nil, err
		}

		searchTitles = append(searchTitles, st)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	var cursor Cursor
	if rows.NextResultSet() {
		if rows.Next() {
			err := rows.Scan(
				&cursor.NextCursorValue,
				&cursor.NextCursorTitleId,
				&cursor.HasMore,
			)
			if err != nil {
				return nil, err
			}
		}
	}
	
	postResponse := PostResponse {
		SearchTitles: searchTitles,
		Cursor: cursor,
	}

	return &postResponse, nil
}
