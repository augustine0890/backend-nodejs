const http = require('http');

http.createServer((req, res) => res.end('hello word!'))
    .listen(8080)
console.log('Server listening on port 8080')