# BookingGo Supplier
This my solution to the [BookingGo Technical Test](https://github.com/rideways/technical_test).

All parts of the project are written on [Node.js](https://nodejs.org/en/), in [Typescript](https://www.typescriptlang.org/) as well as testing.
## Getting Started
Clone the repository
```bash
git clone https://github.com/johniyere/bookingGO_supplier <project_name>
```

Install dependencies
```bash
cd <project_name>
npm install
```

## Running Part 1

```bash
npm run start-cli
```

## Running Part 2

```bash
npm run start-api
```

## Running Tests

```bash
npm run test
```
## Accessing the supplier API

I use [Axios](https://www.npmjs.com/package/axios) as a http client to access the api's mainly becaused it is promise based.

There is also a [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) that easily mocks axios requests for testing.

## Testing Framework

[Jest](https://jestjs.io/en/) is a popular javscript testing framework made by Facebook. It provides alot of built in testing functionalities that I
don't have to input separately.

## Providing a REST API

Rest API is created using [Express](https://expressjs.com/). It's very a very popular and lightweight framework to create rest api's

There is also a set of middlewares [express-validator](https://express-validator.github.io/docs/) that provides validation for rest api's
