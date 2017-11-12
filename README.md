# jeeves

[![Build Status](https://travis-ci.org/hashmaths/jeeves.svg?branch=master)](https://travis-ci.org/hashmaths/jeeves)

Yet another IRC bot.

## Running

Setup `config.js` before starting.

    cp config.example.js config.js
    vim config.js

Run tests

    make test

Run jeeves

    make run

Other useful `make` targets:

  - ***make build**, build docker image
  - ***make repl**, drop into node repl
  - ***make sh**, shell
