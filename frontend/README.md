# Frontend

## Preconditions
 - Install [Node.js](https://nodejs.org/en/) 
 - Install [npm](https://www.npmjs.com/)

## Usage

To locally run the Frontend, use following steps:

``` sh
# Change into project directory
cd frontend

# Install all dependencies
npm install

# Start the development server
npm run start
```

Navigate to http://localhost:4200/ with your browser. The app will
automatically recompile and reload if you change any of the source files.

## Test

To locally run the unit tests, use following step:

``` sh
npm run test
```

## Documentation

The documentation for the frontend can be seen in the **frontend/docs** folder.
Simply open the index.html file in your browser. 
The documentation was generated with the help of typedoc: https://typedoc.org

To update the documentation run:

``` sh
typedoc --entryPointStrategy expand ./src
```
