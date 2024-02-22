import { ApiProperty } from '@nestjs/swagger';

export class ResponseSerialization<T = Record<string, any>> {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    nullable: false,
    example: 200,
    description: 'Return specific status code for every endpoints'
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    nullable: false,
    type: String,
    example: 'Message endpoint',
    description: 'Message endpoint'
  })
  message: string;

  data?: T;
}
