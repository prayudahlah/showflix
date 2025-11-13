package login

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"github.com/gofiber/fiber/v2"
	"log"
	"context"
	"errors"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handler) Login(c *fiber.Ctx) error {
	var req loginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"ok": false,
			"message": "invalid request body",
		})
	}

	ctx := c.Context()

	role, err := h.service.Login(ctx, req.Username, req.Password)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return c.Status(fiber.StatusRequestTimeout).JSON(utils.ErrResponseTimeout)
		}

		if errors.Is(err, context.Canceled) {
			return c.Status(499).JSON(
				utils.WithDetails(utils.ErrResponseCanceled, "Request canceled by client"),
			)
		}

		if errors.Is(err, utils.ErrUnauthorized) {
			return c.Status(fiber.StatusUnauthorized).JSON(utils.ErrResponseUnauthorized)
		}

		log.Printf("Internal server error: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrResponseInternal)
	}

  return c.JSON(fiber.Map{
        "role": role.RoleName,
    })
}
