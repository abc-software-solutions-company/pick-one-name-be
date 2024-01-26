import { registerAs } from '@nestjs/config';

import { IConfigs } from '@/common/interfaces';

export default registerAs('auth', (): IConfigs['auth'] => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
}));
