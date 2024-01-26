import { BadRequestException, Param, ParseUUIDPipe, PipeTransform, Type } from '@nestjs/common';

export const UUIDParam = (property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>) => {
  return Param(
    property,
    new ParseUUIDPipe({
      version: '4',
      exceptionFactory: () => new BadRequestException(`Param ${property} must be an UUID value`)
    }),
    ...pipes
  );
};
