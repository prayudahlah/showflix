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

type searchRequest struct {
	SearchTerm string `json:"searchTerm"`
	RatingMin string `json:"ratingMin"`
    @SearchTerm NVARCHAR(200) = NULL,
    @RatingMin DECIMAL(3,1) = NULL,
    @RatingMax DECIMAL(3,1) = NULL,
    @Genre VARCHAR(50) = NULL,
    @RuntimeMin INT = NULL,
    @RuntimeMax INT = NULL,
    @IsAdult BIT = NULL,
    @Year INT = NULL,
    @SortBy VARCHAR(20) = 'Popularity',
    @SortDirection VARCHAR(4) = 'DESC',
    @CursorValue DECIMAL(18,4) = NULL,
    @CursorTitleId VARCHAR(50) = NULL,
    @PageSize INT = 7
}

func (h *handler) Login(c *fiber.Ctx) error {
	var req searchRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"ok": false,
			"message": "invalid request body",
		})
	}

	ctx := c.Context()

	role, err := h.service.Search(ctx, req)

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
