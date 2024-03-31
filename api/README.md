# README

## OVERVIEW

This is an Express service that provides authorization and includes resources management regarding users and posts.
It also uses Sequelize ORM with SQLite as the database, along with the JSON Web Token (JWT) and AJV librairies.

### PURPOSE

This service is built as a **campagnon** to the front UI application used by the end-users to manage their posts.

## Project Structure

- `data`: Static data uses for testing
- `storage`: Local storage, that stores all the SQLite tables.
- `log`: Contain the readable log files
- `dist`: Contain the distribuable version of the app (JS)
- `src`: Contain the application source code
  - `config`: Contains configuration files for the application
  - `routes`: Contains files related to common app routes and registers all the product CRUD routes

## PREREQUISITES

Before running the application, make sure you have the following installed:

1. NodeJS (v18)
2. NPM (v9)

## USAGE

To start the service, during the development phase, run the following command:

```shell
npm run dev
```

To start the service, run the following command:

```shell
npm start
```

## License

This project is licensed under the MIT License.
