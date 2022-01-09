.PHONY: build
build:
	@npm run build

.PHONY: test
test:
	@npm run test

.PHONY: docker-compose
docker-compose:
	@docker-compose up -d
