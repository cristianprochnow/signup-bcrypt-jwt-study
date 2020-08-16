# 📖 About

**A simple study case about how Bcrypt and JWT works in a register or authentication.**

[![Run in Insomnia][imsomnia-button]][insomnia-url]

## 🧱 Made with

- TypeScript
- Node
- Express
- Bcrypt
- UUID
- Knex
- SQLite
- Json Web Token (JWT)

# 🧰 Setup

- [x] Add TS setup
- [x] Init TS
- [x] Add `ts-node-dev` script
- [x] Add ESLint
- [x] Add database

# 🛣 Roadmap

- [x] Create route for Sign Up
- [x] Improve route for Sign Up
  - [x] Add uuid
  - [x] Add Bcrypt
  - [x] Add verification for ensure that there are not two user with same username
- [x] Process data
- [x] Store in database
- [x] Create route for Log In
- [x] Create JWT
  - [x] Add .env
  - [x] Add secret key
  - [x] Add JWT to login
- [x] Create Middleware
  - [x] Translate data from token

[imsomnia-button]: https://insomnia.rest/images/run.svg
[insomnia-url]: https://insomnia.rest/run/?label=SignupBcrypt&uri=https%3A%2F%2Fgithub.com%2Fcristianprochnow%2Fsignup-bcrypt-jwt-study%2Fblob%2Fmaster%2FInsomnia.json
