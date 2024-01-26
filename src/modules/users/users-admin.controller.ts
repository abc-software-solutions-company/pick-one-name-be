import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Response, UUIDParam } from '@/common/decorators';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller({ path: 'admin/users' })
@ApiTags('Users')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Response({ message: 'Create user successfully.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Response({ message: 'Get users successfully.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Response({ message: 'Get user successfully.' })
  findOne(@UUIDParam('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Response({ message: 'Update user successfully.' })
  update(@UUIDParam('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Response({ message: 'Delete user successfully.' })
  remove(@UUIDParam('id') id: string) {
    return this.usersService.remove(id);
  }
}
