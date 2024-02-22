import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

import { ENV } from '@/common/constants';

export default registerAs('app', (): IConfigs['app'] => ({
  host: process.env.NEST_HOST,
  port: process.env.NEST_PORT || 3500,
  isDocumentationEnabled: process.env.DOCUMENTATION_ENABLED === 'true',
  env: (process.env.NODE_ENV as ENV) || ENV.DEVELOPMENT
}));
