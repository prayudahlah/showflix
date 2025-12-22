package login

import (
	"context"
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
