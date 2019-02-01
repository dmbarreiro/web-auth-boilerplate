# Web Authentication Boilerplate with Express

A template for web authentication systems using Express. MongoDB and EJS are the database and view engine but both can be easily substituted. The intention is to have easy to understande/easy to extend code for the authentication part of our web apps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Support](#support)
- [Contributing](#contributing)
- [Acknowledgment](#acknowledgment)

## Installation

You need to have a local MongoDB database in `mongodb://localhost:27017`, we will create database `test`. Adapt these database settings to your needs editing `MongoURI` in `config/database/keys.js` file.
Clone the repository and type the following commands:

```sh
cd web-auth-boilerplate
npm install
npm run dev
```

## Usage

To access the demo app on you browser go to `http://localhost:3000`

## API

The API is under `/api/v1/users`
- `GET` `/dashboard` -> Shows dashboard with logout option when authenticated
- `GET` `/logout` -> Logout the user
- `GET` `/login` -> Gets login form
- `GET` `/register` -> Gets registration form
- `POST` `/login` -> Sends login form
- `POST` `/register` -> Sends registration form

We have a welcome page in `/`.

## Support

Please [open an issue](https://github.com/fraction/readme-boilerplate/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/fraction/readme-boilerplate/compare/).

## Acknowledgments

Thanks to [Brad Traversy](https://github.com/bradtraversy) for the idea and tutorials.
