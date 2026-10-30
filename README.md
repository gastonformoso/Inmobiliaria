# Inmobiliaria Full-Stack

React + Vite frontend, Spring Boot 3 backend, PostgreSQL, Docker Compose.

## Run
docker compose up --build

Frontend: http://localhost:5173
Backend: http://localhost:8080
Swagger: http://localhost:8080/swagger-ui.html

## Local dev
Backend: cd backend && mvn spring-boot:run
Frontend: cd frontend && npm install && npm run dev

## Tests
cd backend && mvn test
