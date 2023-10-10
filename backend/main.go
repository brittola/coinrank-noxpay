package main

import (
	"net/http"

	_ "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo/v4"
)

// estrutura do json de upvotes
type UpdateUpvotesRequest struct {
	ID      uint `json:"id"`
	Upvotes int  `json:"upvotes"`
}

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

	e.PUT("/coins", func(c echo.Context) error {
		var req UpdateUpvotesRequest
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "JSON inválido"})
		}

		if req.Upvotes < -1 || req.Upvotes > 1 {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Só é possível registrar um voto por requisição"})
		}

		var coin Coin
		if err := db.Where("id = ?", req.ID).First(&coin).Error; err != nil {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Moeda não encontrada"})
		}

		coin.Upvotes += req.Upvotes
		if err := db.Save(&coin).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Erro ao atualizar os upvotes"})
		}

		return c.JSON(http.StatusOK, coin)
	})

	e.Start(":8080")
}
