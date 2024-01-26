import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LogOutDoc {
  @ApiProperty({ enum: HttpStatus, example: HttpStatus.OK })
  statusCode: HttpStatus;

  @ApiProperty({ type: String, example: 'Logout successfully.' })
  message: string;

  @ApiProperty({
    type: 'object',
    example: {
      status: 'success'
    }
  })
  data: any;
}
