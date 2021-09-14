const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  if (!req.session.visits) {
    req.session.visits = {
      '/': 0,
      '/private': 0,
    }
  }
  next();
})

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.localAddress;
  req.session.ip = ip;
  next();
})

app.get('/', (req, res) => {
  ++req.session.visits['/'];
  res.send(`You visited ${JSON.stringify(req.session.visits)} times. Last time from ${req.session.ip}`)
})

app.get('/private', (req, res) => {
  ++req.session.visits['/private'];
  res.send(`You visited ${JSON.stringify(req.session.visits)} times. Last time from ${req.session.ip}`)
})

app.listen(3000)