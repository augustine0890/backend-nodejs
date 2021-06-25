import { ConnectionOptions } from 'typeorm';
import { User } from './modules/auth/user.entity';
import { Product } from './modules/product/product.entity';
import { Shop } from './modules/shop/shop.entity';

const developmentConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Shop, Product],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true,
  logging: true,
};

const productionConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_DB_URL,
  entities: [],
  synchronize: false,
};

export const config =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
