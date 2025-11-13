package persons

import (
	"context"
	"time"
)

type PersonService interface {
	GetByID(ctx context.Context, id string) (*Person, error)
}

type personService struct {
	repo PersonRepo
}

func NewService(repo PersonRepo) PersonService {
	 return &personService {repo: repo}
}

func (s *personService) GetByID(ctx context.Context, id string) (*Person, error) {
	const queryTimeout = 3 * time.Second

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	return s.repo.GetByID(ctx, id)
}
