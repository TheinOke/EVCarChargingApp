.PHONY: up up-build down restart logs logs-server logs-client logs-mongo \
        ps build seed test shell-server shell-client shell-mongo clean

## Start all services (mongo, server, client) in the background
up:
	docker compose up -d

## Rebuild images and start all services
up-build:
	docker compose up -d --build

## Stop and remove all containers
down:
	docker compose down

## Restart all services
restart:
	docker compose restart

## Follow logs for all services
logs:
	docker compose logs -f

## Follow logs for a single service
logs-server:
	docker compose logs -f server

logs-client:
	docker compose logs -f client

logs-mongo:
	docker compose logs -f mongo

## Show status of all containers
ps:
	docker compose ps

## Build (or rebuild) images without starting containers
build:
	docker compose build

## Seed the database with mock stations + test user/cars
seed:
	docker compose exec server npm run seed

## Run the backend test suite
test:
	docker compose exec server npm test

## Open a shell in a running container
shell-server:
	docker compose exec server sh

shell-client:
	docker compose exec client sh

shell-mongo:
	docker compose exec mongo mongosh voltpoint

## Stop containers and remove volumes (wipes the database)
clean:
	docker compose down -v
