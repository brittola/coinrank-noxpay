package main

import (
	_ "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {
	db, err := ConnectDatabase()
	if err != nil {
		panic(err)
	}
	defer db.Close()
}
