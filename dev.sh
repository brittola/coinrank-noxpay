#!/bin/bash

cd backend
go run Coin.go database.go main.go &
cd ..

cd frontend
npm start
cd ..
