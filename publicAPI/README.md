# Public API

## Preconditions
 - Install [Node.js](https://nodejs.org/en/) 
 - Install [npm](https://www.npmjs.com/)

## Usage

To locally run the Public API, use following steps:

``` sh
# Change into project directory
cd publicAPI

# Install all dependencies
npm install

# Start the development server
npm run start
```

The server is available at http://localhost:3000/.

## Test

To locally run the unit tests, use following step:

``` sh
npm run test
```

## Formatting

To format all `*.ts` files run:

``` sh
npm run format
```

## Docs

To have a nice overview about the whole public API documentation run:

```bash
npm start documentation:serve
```

Open `http://localhost:8080` in your browser.
