package routes

import (
	"database/sql"
	"github.com/prayudahlah/showflix/backend/internal/persons"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App, db *sql.DB) {
	personHandler := persons.NewHandler(persons.NewService(persons.NewRepo(db)))

	api := app.Group("/api")

	// persons
	api.Get("/persons/:id", personHandler.GetByID)
}
