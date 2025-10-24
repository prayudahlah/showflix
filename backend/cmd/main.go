package main

import (
	"github.com/prayudahlah/showflix/backend/internal/config"
)

func main()  {
	db := config.InitDB()
	defer db.Close()
}
