package main

import (
	"github.com/prayudahlah/showflix/backend/db"
)

func main()  {
	db := db.InitDB()
	defer db.Close()

	log.Println("Berhasil connect ke database")
}
