import config from './../config/config';
import app from './express';
const chalk = require('chalk');
import mongoose from 'mongoose';

// Connection URL
mongoose.Promise = global.Promise
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
