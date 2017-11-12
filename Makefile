
ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

build:
	docker build -t jeeves:latest .

run: build
	docker run \
		-it \
		-v ${ROOT_DIR}/config.js:/jeeves/config.js \
		-t jeeves:latest

test: build
	docker run \
		-it \
		-v ${ROOT_DIR}/config.js:/jeeves/config.js \
		-t jeeves:latest \
		npm test

repl: build
	docker run \
		-it \
		-v ${ROOT_DIR}:/jeeves \
		-t jeeves:latest \
		node

shell: build
	docker run \
		-it \
		-t jeeves:latest \
		/bin/sh
