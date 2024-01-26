import { NestExpressApplication } from '@nestjs/platform-express';
import supertest from 'supertest';

export const login = async (app: NestExpressApplication, credentials: { email: string; password: string }) => {
  const res = await supertest(app.getHttpServer()).post('/api/v1/auth/login').send(credentials);

  return res;
};

export const logout = async (app: NestExpressApplication, data: { token: string }) => {
  const res = await supertest(app.getHttpServer()).post('/api/v1/auth/logout').send(data);

  return res;
};
