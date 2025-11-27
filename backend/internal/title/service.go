package title

import (
	"context"
	"time"
)

type Service interface {
	Get(ctx context.Context, id string) (*GetResponse, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	 return &service {repo: repo}
}

func (s *service) Get(ctx context.Context, id string) (*GetResponse, error) {
	const queryTimeout = 5 * time.Second

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	return s.repo.Get(ctx, id)
}

