package searchPerson

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
	EXEC sp_Landing_Persons
		@SearchTerm = @searchTerm,
		@Profession = @profession,
		@BirthDateMin = @birthDateMin,
		@BirthDateMax = @birthDateMax,
		@DeathDateMin = @deathDateMin,
		@DeathDateMax = @deathDateMax,
		@SortDirection = @sortDirection,
		@CursorValue = @cursorValue,
		@CursorPersonId = @cursorPersonId,
		@PageSize = @pageSize
	`
	rows, err := r.db.QueryContext(ctx, query,
		sql.Named("searchTerm",    req.SearchTerm),
		sql.Named("profession",    req.Profession),
		sql.Named("birthDateMin",     req.BirthDateMin),
		sql.Named("birthDateMax",     req.BirthDateMax),
		sql.Named("deathDateMin",     req.DeathDateMin),
		sql.Named("deathDateMax",     req.DeathDateMax),
		sql.Named("sortDirection", req.SortDirection),
		sql.Named("cursorValue",   req.CursorValue),
		sql.Named("cursorPersonId", req.CursorPersonId),
		sql.Named("pageSize",      req.PageSize),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var searchPersons []SearchPerson

	for rows.Next() {
		var sp SearchPerson

		err := rows.Scan(
			&sp.PersonId,
			&sp.Popularity,
			&sp.PrimaryName,
			&sp.Profession,
			&sp.BirthYear,
			&sp.DeathYear,
			&sp.Age,
		)

		if err != nil {
			return nil, err
		}

		searchPersons = append(searchPersons, sp)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	var cursor Cursor
	if rows.NextResultSet() {
		if rows.Next() {
			err := rows.Scan(
				&cursor.NextCursorValue,
				&cursor.NextCursorPersonId,
				&cursor.HasMore,
			)
			if err != nil {
				return nil, err
			}
		}
	}
	
	postResponse := PostResponse {
		SearchPersons: searchPersons,
		Cursor: cursor,
	}

	return &postResponse, nil
}
