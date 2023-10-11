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

	dbPassword := os.Getenv("DATABASE_PASSWORD")

	db, err := gorm.Open("postgres", "user=brittola dbname=coinrank sslmode=disable password="+dbPassword)
	if err != nil {
		return nil, err
	}

	return db, nil
}
