package persons

import (
	"github.com/prayudahlah/showflix/backend/internal/utils"
	"github.com/gofiber/fiber/v2"
	"log"
	"context"
	"errors"
)

type PersonHandler struct {
	Service PersonService
}

func NewHandler(service PersonService) *PersonHandler {
	return &PersonHandler{Service: service}
}

func (h *PersonHandler) GetByID(c *fiber.Ctx) error {
	id := c.Params("id")

	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(
			utils.WithDetails(utils.ErrResponseInvalidInput, "Person ID is required"),
		)
	}

	ctx := c.Context()

	person, err := h.Service.GetByID(ctx, id)

	if err != nil {
		if errors.Is(err, utils.ErrNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(
				utils.WithDetails(utils.ErrResponseNotFound, "Person not found"),
			)
		}

		if errors.Is(err, context.DeadlineExceeded) {
			return c.Status(fiber.StatusRequestTimeout).JSON(utils.ErrResponseTimeout)
		}

		if errors.Is(err, context.Canceled) {
			return c.Status(499).JSON(
				utils.WithDetails(utils.ErrResponseCanceled, "Request canceled by client"),
			)
		}

		log.Printf("Internal server error: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(utils.ErrResponseInternal)
	}

	personDTO := ToDTO(person)

	return c.JSON(personDTO)
}

// func (h *PersonHandler) Create(c *fiber.Ctx) error {
//
// }
