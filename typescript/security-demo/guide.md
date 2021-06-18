# Authentication

## Introduction
- You need a valid API key and API secret to call an API.
- `accesskey`: must add to the HTTP header to use APIs
- `secretkey`: must add to the HTTP header and used to hash a signature.
- All API requests are sent via HTTPS
- Parameters can be sent as a path, query or request body in JSON.
- Sample request header:
  ```http
  Host: api.blockchain.net
  Content-Type: application/json
  access-api-key: <your api key>
  signature: <the user generated message signature>
  timestamp: <a timestamp for your request>
  ```
- Some API endpoints can use the request body as a parameter --> should be in JSON.
- The response body is a JSON object with details on the results including the following attributes.

## Authentication
- All API requests must pass authentication information in the HTTP header. The server validates API requests with the given authenticatin information as follows. Invalid requests aren't processed.

__Header__
  - `timestamp`: time of the request created (displayed in milliseconds since Unix Epoch at UTC)
  - `access-api-key`: API access key of the service issued by the NFT management system
  - `signature`: result of an API request signed with the `secretkey` of the service

__Generating a signature__
  1. Create a string by concatenating timestamp, HTTP method, request path, query string and request body string in the order.
  2. Sign the string from step 1 with API secretkey, using HMAC-SHA512
  3. Encode the result from step 2 above with Base64