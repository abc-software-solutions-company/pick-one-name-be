import { hashPassword } from '@/common/utils/password.util';

import { AUTH_PROVIDER, AUTH_TYPE } from '@/modules/auth/constants/auth.constant';
import { GENDER, ROLE, USER_STATUS } from '@/modules/users/constants/users.constant';

interface IUserFactory {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  password?: string;
  emailVerified?: boolean;
  locale?: string;
  providerAccountId?: string;
  provider?: AUTH_PROVIDER;
  authType?: AUTH_TYPE;
  gender?: GENDER;
  status?: USER_STATUS;
  role?: ROLE;
}

export const userFactory: IUserFactory[] = [
  {
    id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
    name: 'Tin Tran',
    email: process.env.USER_EMAIL,
    password: hashPassword(process.env.USER_PASSWORD),
    gender: GENDER.OTHER,
    status: USER_STATUS.ACTIVE,
    role: ROLE.SUPER_ADMIN,
    provider: AUTH_PROVIDER.CREDENTIALS,
    authType: AUTH_TYPE.CREDENTIALS
  }
];
