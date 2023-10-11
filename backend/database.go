package main

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

// exporta conexão com o banco
func ConnectDatabase() (*gorm.DB, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Erro ao carregar o arquivo .env")
	}

	dbURL := os.Getenv("DATABASE_URL")

	db, err := gorm.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	return db, nil
}
