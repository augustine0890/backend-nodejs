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