package main

import (
	"github.com/prayudahlah/showflix/backend/config"
	"log"
)

func main()  {
	db := config.InitDB()
	defer db.Close()

	log.Println("Berhasil connect ke database")
}
