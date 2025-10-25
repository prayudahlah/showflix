package routes

import (
	"database/sql"
	"github.com/prayudahlah/showflix/backend/internal/persons"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App, db *sql.DB) {
	// persons
	personRepo := persons.NewRepo(db)
	personService := persons.NewService(personRepo)
	personHandler := persons.NewHandler(personService)

	// api group
	api := app.Group("/api")

	// persons endpoint
	api.Get("/persons/:id", personHandler.GetByID)
}
