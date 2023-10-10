package main

import (
	"net/http"

	_ "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo/v4"
)

func main() {
	// conexão com o banco
	db, err := ConnectDatabase()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// inicializando o echo
	e := echo.New()

	// rotas
	e.GET("/coins", func(c echo.Context) error {
		var coins []Coin

		if err := db.Find(&coins).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Erro ao buscar os registros"})
		}

		return c.JSON(http.StatusOK, coins)
	})

	e.Start(":8080")
}
