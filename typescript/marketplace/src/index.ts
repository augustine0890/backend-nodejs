import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { config } from './ormconfig';
import { App } from './app';
import { AuthController } from './modules/auth/auth.controller';
import { User } from './modules/auth/user.entity';
import { validateEnv } from './utils/validateEnv';
import { ShopController } from './modules/shop/shop.controller';

// expand Request interface with a new property: user: User
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

validateEnv();

(async (): Promise<void> => {
  try {
    const connection = await createConnection(config);
    // connection.runMigrations();
    console.log(`Is connected: ${connection.isConnected}`);
  } catch (err) {
    console.log('Error while connecting to the database', err);
    return err;
  }

  const app = new App([new AuthController(), new ShopController()]);
  app.listen();
  app.test();
})();
