import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export default registerAs('database', (): IConfigs['database'] => ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  name: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  schema: process.env.DB_SCHEMA || 'public',
  isLoggingEnable: process.env.DB_LOGS === 'true'
}));
