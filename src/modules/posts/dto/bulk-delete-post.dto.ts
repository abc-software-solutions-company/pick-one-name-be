import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class BulkDeletePostDto {
  @ApiProperty({
    description: 'ids',
    example: ['bd0c37d2-fff1-4246-a293-544fac4cc23c', '579d6cb6-22e6-4521-a100-552d8b13e1ad']
  })
  @IsArray()
  @IsUUID('4', { each: true })
  readonly ids: string[];
}
