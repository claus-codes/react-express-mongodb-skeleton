# React, Express and MongoDB skeleton project
This project is intended to be used as a base for building other applications. I attempt to use latest development practices for [React](https://github.com/facebook/react), [Express](https://github.com/expressjs/express) and MongoDB using [Mongoose](https://github.com/Automattic/mongoose).

It includes server routes using Express routers, and user register, login and logout functionality.

## Installation

  	yarn install

You also need to generate SSL certificates to the *keys* folder.

	cd keys
    openssl genrsa -out private_key.pem 2048
    openssl rsa -in private_key.pem -outform PEM -pubout -out public_key.pem


## Running development mode with Rollup

  	yarn dev

The project starts on port **9001**. See *src/server/config.js* for more options.

## Building for production

	yarn build

After building you can start the server with:

	yarn start
