import { Socket } from 'socket.io';

import { User } from '@/modules/users/entities/user.entity';

export interface ICustomSocket extends Socket {
  user: User;
}
