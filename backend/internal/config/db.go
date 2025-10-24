package config

import (
	"database/sql"
	"log"
	"fmt"
	"time"
	"context"

	_ "github.com/microsoft/go-mssqldb"
)

func InitDB() *sql.DB {
	log.SetPrefix("[DB] ")
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)

	cfg := LoadConfig()

	connStr := fmt.Sprintf(
		"sqlserver://%s:%s@%s:%s/instance?database=%s",
		cfg.DBUser,
		cfg.DBPass,
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBName,
	)

	db, err := sql.Open("sqlserver", connStr)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal("Koneksi ke database gagal\n-> ", err)
	}

	log.Println("Koneksi ke database berhasil")

	return db
}
