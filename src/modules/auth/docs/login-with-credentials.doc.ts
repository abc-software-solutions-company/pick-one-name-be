import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginWithCredentialsDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Login successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      user: {
        id: '29332240-8d2d-45ad-8bbe-8cfe5906b30a',
        email: 'tindl88@gmail.com',
        role: 'SUPER_ADMIN',
        name: 'Tin Tran',
        avatar: null,
        accessToken: '<TOKEN>',
        refreshToken: '<TOKEN>'
      }
    }
  })
  data: any;
}
