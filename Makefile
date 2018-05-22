BIN_DIR = node_modules/.bin
TAG = "\\033[34m[+]\\033[0m"

install:
	@echo "$(TAG) install"
	yarn install

build:
	@echo "$(TAG) build"
	@$(BIN_DIR)/rollup -c

test:
	@echo "$(TAG) test"
	@$(BIN_DIR)/jest

test-coverage:
	@echo "$(TAG) test-coverage"
	@$(BIN_DIR)/jest --coverage

codecov:
	@echo "$(TAG) codecov"
	@$(MAKE) test-coverage
	@$(BIN_DIR)/codecov

clean-all:
	@echo "$(TAG) clean-all"
	@$(MAKE) clean
	@$(MAKE) clean-lib

clean-lib:
	@echo "$(TAG) clean-lib"
	@rm -rf lib

clean:
	@echo "$(TAG) clean"
	@rm -rf node_modules coverage flow-typed

lint:
	@echo "$(TAG) lint"
	@$(BIN_DIR)/eslint src

flow-lib:
	@echo "$(TAG) flow-lib"
	@$(BIN_DIR)/flow-typed install

flow:
	@echo "$(TAG) flow"
	@$(BIN_DIR)/flow check

ci:
	@echo "$(TAG) ci"
	@$(MAKE) install
	@$(MAKE) build
	@$(MAKE) lint
	@$(MAKE) flow-lib
	@$(MAKE) flow
	@$(MAKE) codecov
