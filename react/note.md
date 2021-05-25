# Complete Intro to React

- Root project
    - `npm init -y`
- Prettier
    - `npm install -D prettier` --> `-D` means it's for development only.
    ```
    "scripts": {
	"format": "prettier --write \"src/**/*.{js,jsx}\""
    },
    ```
- ESLint
    - `npm install -D eslint@7.18.0 eslint-config-prettier@8.1.0`
    - Create this file called `.eslintrc.json`.
    ```
    {
      "extends": ["eslint:recommended", "prettier"],
      "plugins": [],
      "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "env": {
        "es6": true,
        "browser": true,
        "node": true
      }
    }    
    ```
    ```
    "lint": "eslint \"src/**/*.{js,jsx}\" --quiet",
    ```
    - `npm run lint`
- Parcel
    - `npm install -D parcel@1.12.3`
    - Inside of `package.json`
    ```
    "scripts" {
        "dev": "parcel src/index.html"
    }
    ```
    - `npm install react@17.0.1 react-dom@17.0.1`
- Babel
    - `npm install -D @babel/core@7.12.16 @babel/preset-react@7.12.13`
    - Create file `.babelrc`
    ```
    {
      "presets": [
        [
          "@babel/preset-react",
          {
            "runtime": "automatic"
          }
        ]
      ]
    }
    ```
- ESLint + React
    - Update `.eslintrc.json`
    ```
    {
      "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
        "prettier/react"
      ],
      "rules": {
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0
      },
      "plugins": ["react", "import", "jsx-a11y"],
      "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "env": {
        "es6": true,
        "browser": true,
        "node": true
      },
      "settings": {
        "react": {
          "version": "detect"
        }
      }
    }
    ```
- Hooks
    - `npm install -D eslint-plugin-react-hooks@4.2.0`
    - Add to `.eslintrc.json`
    ```
    {
      "extends": [
        "plugin:react-hooks/recommended",
      ]
    }
    ```
- React Dev Tools
    - `NODE_ENV=development`
    - `NODE_ENV=production` --> the weight gets stripped out
- Strict Mode
    - It will give you additional warnings about things you shouldn't be doing.
    ```jsx
    // import at top
    import { StrictMode } from "react";

    // replace render
    render(
      <StrictMode>
        <App />
      </StrictMode>,
      document.getElementById("root")
    );
    ```
- React Router
    - `npm install react-router-dom@5.2.0`