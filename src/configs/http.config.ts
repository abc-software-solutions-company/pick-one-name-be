import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export default registerAs('http', (): IConfigs['http'] => ({
  timeout: process.env.REQUEST_TIMEOUT || 120000
}));
