package main

import (
	_ "github.com/jinzhu/gorm"
)

// model
type Coin struct {
	ID      uint   `json:"id"`
	Name    string `json:"name"`
	Upvotes int    `json:"upvotes"`
	IconURL string `json:"icon_url" gorm:"column:iconurl"` // especificando nome da coluna, para manter IconURL (mais legível)
}
