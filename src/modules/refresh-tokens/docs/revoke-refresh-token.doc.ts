import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class RevokeRefreshTokenDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Revoke refresh token successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      status: 'success'
    }
  })
  data: any;
}
