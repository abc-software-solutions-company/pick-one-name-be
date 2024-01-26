import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export default registerAs('redis', (): IConfigs['redis'] => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
}));
