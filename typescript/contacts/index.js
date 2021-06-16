import config from './config/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/routes';
const chalk = require('chalk');
const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() =>
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
  );

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

// bodyparser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

// serving static files
app.use(express.static('public'));
app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${config.port}. Visit http://localhost:${config.port}/ in your browser.`
    )}`
  );
})

app.get('/', (req, res) => {
  res.status(200).send({ ok: true });
});
