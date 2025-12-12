package config

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

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
		log.Fatal("Failed connecting to database\n-> ", err)
	}

	log.Println("Succesfully connected to database")

	return db
}
