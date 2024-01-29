import { PartialType } from '@nestjs/mapped-types';
import { CreateRandomDto } from './create-random.dto';

export class UpdateRandomDto extends PartialType(CreateRandomDto) {}
