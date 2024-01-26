import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export default registerAs('cache', (): IConfigs['cache'] => ({
  timeToLive: process.env.CACHE_TIME_TO_LIVE | 900
}));
