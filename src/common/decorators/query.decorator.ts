import { BadRequestException, ParseUUIDPipe, PipeTransform, Query, Type } from '@nestjs/common';

export const UUIDQuery = (property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>) => {
  return Query(
    property,
    new ParseUUIDPipe({
      version: '4',
      exceptionFactory: () => new BadRequestException(`Query ${property} must be an UUID value`)
    }),
    ...pipes
  );
};
