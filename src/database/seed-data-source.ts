import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from '@/common/utils';

dotenv.config({ path: path.join(__dirname, `../../.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`) });

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  entities: [path.join(__dirname, '../modules/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../database/seeds/*{.ts,.js}')],
  migrationsTableName: 'seeds_lock',
  namingStrategy: new SnakeNamingStrategy()
};

export const dataSource = new DataSource(options);
