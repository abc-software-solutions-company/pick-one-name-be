import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.CREATED })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Create refresh token successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      id: '1322785b-2ceb-4aa2-8b38-54a9e024e5dc',
      token: '<TOKEN>'
    }
  })
  data: any;
}
