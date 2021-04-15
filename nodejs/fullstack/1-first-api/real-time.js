const fs = require('fs');
const EventEmitter = require('events');
const express = require('express');
const port = process.env.PORT || 1337;

const chatEmitter = new EventEmitter();
chatEmitter.on('message', console.log)

app = express();
app.listen(port, () => console.log(`Server listening on port ${port}`));

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}

function respondStatic(req, res) {
    const filename = `${__dirname}/public/${req.params[0]}`;
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}

function respondChat(req, res) {
    const { message } = req.query;

    chatEmitter.emit('message', message);
    res.end();
}

function respondSSE(req, res) {
    res.writeHead(200, {
        'Contect-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })

    const onMessage = msg => res.write(`data: ${msg}\n\n`)
    chatEmitter.on('message', onMessage);

    res.on('close', function() {
        chatEmitter.off('message', onMessage)
    })
}

app.get('/static/*', respondStatic)
app.get('/chat', respondChat);
app.get('/sse', respondSSE);

