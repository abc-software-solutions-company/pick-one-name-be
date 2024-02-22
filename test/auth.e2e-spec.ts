import { NestExpressApplication } from '@nestjs/platform-express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hashPassword } from '@/common/utils';

import { AuthModule } from '@/modules/auth/auth.module';
import { RefreshToken } from '@/modules/refresh-tokens/entities/refresh-token.entity';
import { UsersService } from '@/modules/users/users.service';

import { login, logout } from './utils/auth.util';
import { setupTestingModules } from './utils/setup.util';

describe('AuthController (e2e)', () => {
  let myApp: NestExpressApplication;
  let usersService: UsersService;
  let refreshTokenRepository: Repository<RefreshToken>;

  beforeAll(async () => {
    const { app, moduleFixture } = await setupTestingModules([AuthModule]);

    myApp = app;

    usersService = moduleFixture.get(UsersService);
    refreshTokenRepository = moduleFixture.get(getRepositoryToken(RefreshToken));

    // Find and remove user if exists
    const user = await usersService.findByEmail(process.env.USER_EMAIL);

    if (user) {
      const refreshTokens = await refreshTokenRepository.findBy({ user: { email: process.env.USER_EMAIL } });

      await refreshTokenRepository.remove(refreshTokens);
      await user.remove();
    }

    // Create user
    await usersService.create({
      email: process.env.USER_EMAIL,
      password: hashPassword(process.env.USER_PASSWORD),
      name: 'test'
    });
  });

  afterAll(async () => {
    myApp.close();
  });

  describe('#login [POST]', () => {
    it('returns returns 400 - Bad Request if credentials is invalid', async () => {
      const response = await login(myApp, { email: '', password: '' });

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'email must be an email',
          'email should not be empty',
          'password has to be at between 6 and 50 chars',
          'password should not be empty'
        ]
      });
    });

    it('should not returns user if credentials are incorrect', async () => {
      const response = await login(myApp, { email: 'dummy@email.com', password: 'dummypassword' });

      expect(response.body).toMatchObject({ statusCode: 401, error: 'Unauthorized', message: 'User not found' });
    });

    it('should returns user if credentials are correct', async () => {
      const response = await login(myApp, { email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD });

      expect(response.body).toMatchObject({ statusCode: 200, message: 'Login successfully.' });
      expect(response.body.data.user).toMatchObject({
        email: process.env.USER_EMAIL,
        role: 'SUPER_ADMIN',
        name: 'test',
        avatar: null,
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      });
    });
  });

  describe('#logout [POST]', () => {
    it('should returns 400 - Bad Request if token is empty', async () => {
      const response = await logout(myApp, { token: '' });

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
        message: ['token should not be empty']
      });
    });

    it('should return 404 - Not Found if token is incorrect', async () => {
      const response = await logout(myApp, { token: 'wrongtoken' });

      expect(response.body).toMatchObject({
        statusCode: 404,
        error: 'Not Found',
        message: 'Refresh token not found'
      });
    });

    it('should return 200 - Success if token is correct', async () => {
      const loginResponse = await login(myApp, { email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD });

      const response = await logout(myApp, { token: loginResponse.body.data.user.refreshToken });

      expect(response.body).toMatchObject({ statusCode: 200, message: 'Logout successfully.' });
      expect(response.body.data).toMatchObject({
        status: 'success'
      });
    });
  });
});
