package persons

import "github.com/gofiber/fiber/v2"

type PersonHandler struct {
	Service PersonService
}

func NewHandler(service PersonService) *PersonHandler {
	return &PersonHandler{Service: service}
}

func (h *PersonHandler) GetByID(c *fiber.Ctx) error {
	id := c.Params("id")

	person, err := h.Service.GetByID(id)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Movie not found"})
	}

	return c.JSON(person)
}

// func (h *PersonHandler) Create(c *fiber.Ctx) error {
//
// }
