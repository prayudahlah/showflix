package searchPerson

import (
	"context"
	"time"
)

type Service interface {
	Search(ctx context.Context, req RequestBody) (*PostResponse, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service {repo: repo}
}

func (s *service) Search(ctx context.Context, req RequestBody) (*PostResponse, error) {
	const queryTimeout = 10 * time.Second

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	if req.SearchTerm != nil {
    quoted := `"` + *req.SearchTerm + `"`
    req.SearchTerm = &quoted
	}

	if req.SortDirection == nil {
		defaultVal := "DESC"
    req.SortDirection = &defaultVal
	}

	if req.PageSize == nil {
		defaultVal := 7
    req.PageSize = &defaultVal
	}

	data, err := s.repo.Search(ctx, req)

	if err != nil {
		return nil, err
	}

	return data, nil
}
