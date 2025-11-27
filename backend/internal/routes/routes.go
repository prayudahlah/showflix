package routes

import (
	"database/sql"
	"github.com/prayudahlah/showflix/backend/internal/login"
	"github.com/prayudahlah/showflix/backend/internal/dashboard/executive"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App, db *sql.DB) {
	// api group
	api := app.Group("/api")

	// login endpoint
	login.RegisterRoutes(api, db)

	// dashboard group
	dash := api.Group("/dashboard")

	//executive endpoint
	executive.RegisterRoutes(dash, db)
}
