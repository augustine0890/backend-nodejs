# A Complete Server

## Install MongoDB Community Edition
- Download MongoDB Homebrew
    - `brew tap mongodb/brew`
- Install MongoDB
    - `brew install mongodb-community@4.4`
- To run MongoDB
    - `brew services start mongodb-community@4.4`
- Check the service __mongodb-community__:
    - `brew services list`
    - `ps aux | grep -v grep | grep mongod`
- Stop run MongoDB
    - `brew services stop mongodb-community@4.4`

## Persistence
- `server.js` creates the server instance and connects endpoints to route handlers.
- `api.js` contains functions are responsible for converting HTTP requests into HTTP responses using our model module (`products.js`)
- `products.js` is responsible for loading and manipulating data.