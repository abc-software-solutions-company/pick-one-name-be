import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { checkValidPassword } from '@/common/utils/password.util';

import { USER_STATUS } from './constants/users.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { AUTH_PROVIDER } from '../auth/constants/auth.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        refreshTokens: true
      }
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findActiveUser(id: string) {
    const user = await this.userRepository.findOneBy({ id, status: USER_STATUS.ACTIVE });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async findByOAuthAccount(provider: AUTH_PROVIDER, providerAccountId: string) {
    const user = await this.userRepository.findOneBy({ provider, providerAccountId });

    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) return null;

    const isValidPassword = await checkValidPassword(user.password, password);

    if (!isValidPassword) return null;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id: id, ...updateUserDto });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    return this.userRepository.remove(user);
  }
}
