package routes

import (
	"database/sql"
	"github.com/prayudahlah/showflix/backend/internal/login"
	"github.com/prayudahlah/showflix/backend/internal/title"
	"github.com/prayudahlah/showflix/backend/internal/person"
	"github.com/prayudahlah/showflix/backend/internal/searchTitle"
	"github.com/prayudahlah/showflix/backend/internal/dashboard/executive"
	"github.com/prayudahlah/showflix/backend/internal/dashboard/marketing"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App, db *sql.DB) {
	// api group
	api := app.Group("/api")

	login.RegisterRoutes(api, db)
	title.RegisterRoutes(api, db)
	person.RegisterRoutes(api, db)

	// search group
	search := api.Group("/search")

	searchTitle.RegisterRoutes(search, db)

	// dashboard group
	dash := api.Group("/dashboard")

	executive.RegisterRoutes(dash, db)
	marketing.RegisterRoutes(dash, db)
}
