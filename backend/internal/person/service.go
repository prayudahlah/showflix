package person

import (
	"context"
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
	return s.repo.Get(ctx, id)
}

