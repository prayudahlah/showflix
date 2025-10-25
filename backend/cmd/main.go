package main

import (
	"log"
	"github.com/prayudahlah/showflix/backend/internal/config"
	"github.com/prayudahlah/showflix/backend/internal/routes"
	"github.com/gofiber/fiber/v2"
)

func main()  {
	app := fiber.New()

	db := config.InitDB()
	defer db.Close()

	routes.SetupRoutes(app, db)

	log.Fatal(app.Listen(":3001"))
}
