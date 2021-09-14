const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const app = express();

MongoClient.connect('mongodb://admin:password@localhost:27017', (error, client) => {
  if (error) return console.error(error);
  var db = client.db('demo')

  app.use(express.json());

  // session
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
  
  // password
  const authorize = (req, res, next) => {
    if (!req.session.user) {
      next(new Error('Not logged in'))
    }
    next();
  }

  app.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/private')
    res.set('Content-Type', 'text/html')
    res.send(`<h2>Log In</h2>
      <form action="/login" method="post">
        <input type="text" name="username"/>
        <input type="password" name="password"/>
        <button type="submit">Log In</button>
      </form>
      <hr/>
      <h2>Sign Up</h2>
      <form action="/signup" method="post">
        <input type="text" name="username"/>
        <input type="password" name="password"/>
        <button type="submit">Sign Up</button>
      </form>
    `)
  })
  
  app.post('/login', (req, res, next) => {
    if (!req.body.password || !req.body.username) {
      next(new Error('Must provide a username and password'));
      res.redirect('/')
    }
    db.collection('users').findOne({username: req.body.username}, (error, user) => {
      if (error) return next(error);
      if (!user) return next(new Error('User name and/or password is incorrect'));
      bcrypt.compare(req.body.password, user.password, (error, matched) => {
        if (!error && matched) {
          req.session.user = {username: user.username}
          res.redirect('/private')
        }
        next(new Error('User name and/or password is incorrect'));
      })
    })
  })

  app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/')
  })

  app.post('/signup', async (req, res, next) => {
    if (!req.body.username || !req.body.password) return next(new Error('User name and/or password is must be provide'));
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    try {
      const results = await db.collection('users').insertOne({username: req.body.username, password: hash})
      req.session.user = {username: results.insertedId}
      res.redirect('/private')
    } catch (err) {
      console.error(err)
    }
  })

  app.get('/private', authorize, (req, res) => {
    res.send(`Hi ${req.session.user.username}
      <br/>
      <a href="/logout">Log out</a>
    `)
  })

  app.use((error, req, res) => {
    console.log(error)
    res.send(error.message)
  })

  app.listen(3000)
  
})
