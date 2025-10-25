package persons

import (
	"github.com/gofiber/fiber/v2"
)

type PersonHandler struct {
	Service PersonService
}

func NewHandler(service PersonService) *PersonHandler {
	return &PersonHandler{Service: service}
}

func (h *PersonHandler) GetByID(c *fiber.Ctx) error {
	id := c.Params("id")

	ctx := c.Context()

	person, err := h.Service.GetByID(ctx, id)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Person not found"})
	}

	personDTO := ToDTO(person)

	return c.JSON(personDTO)
}

// func (h *PersonHandler) Create(c *fiber.Ctx) error {
//
// }
