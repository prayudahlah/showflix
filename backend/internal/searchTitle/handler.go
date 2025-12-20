package searchTitle

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

type RequestBody struct {
	SearchTerm    *string  `json:"searchTerm"`
	RatingMin     *float64 `json:"ratingMin"`
	RatingMax     *float64 `json:"ratingMax"`
	Genre         *string  `json:"genre"`
	RuntimeMin    *int     `json:"runtimeMin"`
	RuntimeMax    *int     `json:"runtimeMax"`
	IsAdult       *bool    `json:"isAdult"`
	Year          *int     `json:"year"`
	SortBy        *string  `json:"sortBy"`
	SortDirection *string  `json:"sortDirection"`
	CursorValue   *float64 `json:"cursorValue"`
	CursorTitleId *string  `json:"cursorTitleId"`
	PageSize      *int     `json:"pageSize"`
}

func (h *handler) Search(c *fiber.Ctx) error {
	var req RequestBody

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"ok": false,
			"message": "invalid request body",
		})
	}

	ctx := c.Context()

	data, err := h.service.Search(ctx, req)

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

  return c.JSON(data.ToDTO())
}
