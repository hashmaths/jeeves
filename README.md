# jeeves

[![Build Status](https://travis-ci.org/hashmaths/jeeves.svg?branch=master)](https://travis-ci.org/hashmaths/jeeves)

Yet another IRC bot.

## Development

Just use docker.

    docker-compose up -d

There is now an IRC server available at `localhost:6667` and jeeves is in the channel `#jeeves`. Connect with `<insert your favourite irc client here>`.

### How to

#### Install npm package

Exec inside the container and install the package from there.

    docker-compose exec jeeves sh
    npm install --save <package>
