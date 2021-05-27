# The MERN Stack
- `Node` and `Express` bind the web backend together, `MongoDB` serves as the NoSQL database, and `React` makes the frontend.
- `Yarn` is a package manager.

## Setting up MERN
- MongoDB
    - Find MongoDB tap: `brew tap mongodb/brew`
    - Install MongoDB: `brew install mongodb-community`
    - Create `/data/db`:
        - `sudo mkdir -p /System/Volumes/Data/data/db`
        - `sudo chown -R `id -un` /System/Volumes/Data/data/db`
    - Start MongoDB
        - `brew services run mongodb-community`
    - Stop MongoDB
        - `brew services stop mongodb-community`
- Node
    - Downloads are available at `nodejs.org/en/download`.
    - `node -v`
- Yarn package manager
    - `npm install --global yarn`
    - `yarn --version`
- Key modules:
    - React: `react`, `react-dom`
    - Express: `express` module
    - MongoDB: `mongodb` module driver.
- devDependency modules
    - Babel modules are needed to convert ES6 and JSX to suitable JS for all browsers.
        - `@babel/core`, `babel-loader`, webpack (transpiling JS files), `@babel/preset-env`, `babel/preset-react`
    - Webpack modules will help bundle the compiled JS
- Initialize `package.json` and install `Node.js` modules
    - `yarn init`
    - `yarn` to fetch and add all modules to the project
- Configure Babel, Webpack, and Nodemon
    - Create a `.babelrc`: to transpile the latest JS syntax with support for code in Node.js environment and also React/JSX code.
    - Webpack:
        - Create `webpack.config.client.js`, `webpack.config.server.js`, and `webpack.config.client.production.js`
        - Code structure
        ```js
        const path = require('path')
        const webpack = require('webpack')
        const CURRENT_WORKING_DIR = process.cwd()

        const config = { ... }

        module.exports = config
        ```
        - [Generate](https://generatewebpackconfig.netlify.app/) Custom Webpack Configration
    - Create `nodemon.json`: watch for changes in the server files during development.
- Frontend views with React
    - Create a root template `template.js`
    ```
    client
    ├── KickStart.js
    └── main.js
    ```
- Server with Express and Node
    ```
    server
    ├── devBundle.js
    └── server.js
    ```
- Serve static file from the dist folder
    - Webpack will compile client-side code in both development and production mode --> `dist` folder.
- Render templates at the root
    - The server receives a request at the root --> render `template.js` in the browser.
- Connect the server to MongoDB
    - `MongoClient` is driver that connects to the running MongoDB instance
- __Run scripts__
    - `yarn development`: get Nodemon, Webpack, and the server started for development
    - `yarn build`: generate the client and server code bundles for production mode (comment out `devBundle.compile` code from `server.js`)
    - `yarn start` run the bundled code in production

## Backend with MongoDB, Express, and Node
- User CRUD and Auth functionality
    - Sign up: users can register by creating a new account using an email address
    - User list: any visitor can see a list of all registered users
    - Authentication: registered users can sign-in and sign-out
    - Protected user profile: only registered users can view individual user details after signing in.
    - Authorized user edit and delete: only a registered and authenticated user can edit or remove their own user account details
- Add `package.json`
    - `yarn init`
- Babel
    - `yarn add --dev @babel/core babel-loader @babel/preset-env`
- Webpack
    - Compile and bundle the server-side code using Babel.
    - `yarn add --dev webpack webpack-cli webpack-node-externals`
- Express
    - body-parser: request body-parsing middleware to handle the complexities of parsing streamable request objects so that we can simplify browser-server communication by exchanging JSON in the request body. To install the module, run `yarn add body-parser`. 
    - cookie-parser: cookie parsing middleware to parse and set cookies in request objects. To install the cookie-parser module, run `yarn add cookie-parser`.
    - compression: compression middleware that will attempt to compress response bodies for all requests that traverse through the middleware --> `yarn add compression`.
    - helmet: collection of middleware functions to help secure Express apps by setting various HTTP headers --> `yarn add helmet`.
    - cors: middleware to enable cross-origin resource sharing (CORS) --> `yarn add cors`.
- MongoDB
    - `yarn add mongoose`

## React Frontend
- Babel
    - `yarn add --dev @babel/preset-react`
- Webpack
    - Bundle client-side code after compiling it with Babel.
    - `yarn add --dev webpack-dev-middleware webpack-hot-middleware file-loader`
    - `yarn add react-hot-loader @hot-loader/react-dom`
- React Dependencies
    - `yarn add react react-dom`
    - `yarn add react-router react-router-dom`
- Material-UI
    - `yarn add @material-ui/core @material-ui/icons`
    - Add style links into `template.js`
    ```html
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    ```
