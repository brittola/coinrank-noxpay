@echo off
cd backend
start go run Coin.go database.go main.go
cd ..
cd frontend
start npm start
