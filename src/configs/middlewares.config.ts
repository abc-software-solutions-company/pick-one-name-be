import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export default registerAs('middlewares', (): IConfigs['middlewares'] => {
  return {
    cors: {
      allowOrigin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      allowHeaders: [
        'Accept',
        'Accept-Language',
        'Content-Language',
        'Content-Type',
        'Origin',
        'Authorization',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
        'Access-Control-Expose-Headers',
        'Access-Control-Max-Age',
        'Referer',
        'Host',
        'Set-Cookie',
        'refreshToken',
        'X-Requested-With',
        'X-Requested-Id',
        'X-Response-Time',
        'user-agent',
        'cache-control',
        'expires',
        'pragma'
      ]
    },
    rateLimit: {
      timeToLive: process.env.THROTTLE_TTL || 60,
      limit: process.env.THROTTLE_LIMIT || 10
    }
  };
});
