package config

import (
	"database/sql"
	"log"
	"fmt"

	_ "github.com/microsoft/go-mssqldb"
)

func InitDB() *sql.DB {
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

	return db
}
