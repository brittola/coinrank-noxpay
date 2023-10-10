package main

import (
	_ "github.com/jinzhu/gorm"
)

type Coin struct {
	ID      uint
	Name    string
	Upvotes int
	IconURL string `gorm:"column:iconurl"` // especificando nome da coluna, para manter IconURL (mais legível)
}
