package login

import (
	"context"
	"time"
	"crypto/sha256"
	"github.com/prayudahlah/showflix/backend/internal/utils"
)

type Service interface {
	Login(ctx context.Context, username string, password string) (*Role, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	 return &service {repo: repo}
}

func (s *service) Login(ctx context.Context, username string, password string) (*Role, error) {
	const queryTimeout = 5 * time.Second

	ctx, cancel := context.WithTimeout(ctx, queryTimeout)
	defer cancel()

	role, err := s.repo.GetByUsername(ctx, username)

	if err != nil {
		return nil, err
	}

	hashed := sha256.Sum256(append(role.Salt, []byte(password)...))
	if string(hashed[:]) != string(role.HashedPassword) {
		return nil, utils.ErrUnauthorized
	}

	return role, nil
}
