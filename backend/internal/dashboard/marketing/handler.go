package marketing

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"github.com/gofiber/fiber/v2"
	"log"
	"context"
	"errors"
)

type handler struct {
	service Service
}

func NewHandler(service Service) *handler {
	return &handler{service: service}
}

func (h *handler) Get(c *fiber.Ctx) error {
	ctx := c.Context()

	data, err := h.service.Get(ctx)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return c.Status(fiber.StatusRequestTimeout).JSON(utils.ErrResponseTimeout)
		}

		if errors.Is(err, context.Canceled) {
			return c.Status(499).JSON(
				utils.WithDetails(utils.ErrResponseCanceled, "Request canceled by client"),
			)
		}

		if errors.Is(err, utils.ErrNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(utils.ErrResponseNotFound)
		}

		log.Printf("Internal server error: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrResponseInternal)
	}

  return c.JSON(data)
}

