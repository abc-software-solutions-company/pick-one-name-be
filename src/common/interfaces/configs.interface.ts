import type { AwsCredentialIdentity } from '@aws-sdk/types';

import { ENV } from '../constants';

export interface IConfigs {
  app: {
    host: string;
    port: number;
    isDocumentationEnabled: boolean;
    env: ENV;
  };
  aws: {
    region: string;
    endpoint: string;
    credentials: AwsCredentialIdentity;
    s3: {
      bucketName: string;
      baseUrl: string;
    };
  };
  http: {
    timeout: number;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
    schema: string;
    isLoggingEnable: boolean;
  };
  auth: {
    jwtSecretKey: string;
    jwtExpiresIn: string;
    jwtRefreshSecretKey: string;
    jwtRefreshExpiresIn: string;
  };
  redis: {
    host: string;
    port: number;
  };
  cache: {
    timeToLive: number;
  };
  middlewares: {
    cors: {
      allowOrigin: string | string[];
      allowMethods: string[];
      allowHeaders: string[];
    };
    rateLimit: {
      timeToLive: number;
      limit: number;
    };
  };
}
