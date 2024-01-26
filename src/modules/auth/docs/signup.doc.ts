import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create account successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      name: 'Tin Tran',
      email: 'tindl88@gmail.com',
      avatar: '',
      phoneNumber: '',
      emailVerified: false,
      locale: '',
      providerAccountId: '',
      provider: 'CREDENTIALS',
      authType: 'CREDENTIALS',
      gender: 'OTHER',
      status: 'ACTIVE',
      role: 'USER',
      updatedAt: '2023-12-05T23:44:49.288Z',
      lastLogin: null,
      id: 'd5866027-6393-4f33-9b83-c62b251b639f',
      createdAt: '2023-12-05T23:44:49.288Z'
    }
  })
  data: any;
}
