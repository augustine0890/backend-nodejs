import config from './config/config';
import { Settings } from './settings';
import * as express from 'express';
import * as mongoose from 'mongoose';
import routes from './src/routes/routes';

import chalk = require('chalk');
const app = express();

// mongoose connection
// mongoose.Promise = global.Promise;
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
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

// bodyparser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

// serving static files
app.use(express.static('public'));
// Settings.PORT or config.port
app.listen(config.port, () => {
  try {
    console.log(
      `${chalk.green('✓')} ${chalk.blue(
        `Listening on port ${Settings.PORT}. Visit http://localhost:${config.port}/ in your browser.`
      )}`
    );
  } catch (err) {
    console.log(err)
  }
});

app.get('/', (req, res) => {
  res.status(200).send({ ok: true });
});
