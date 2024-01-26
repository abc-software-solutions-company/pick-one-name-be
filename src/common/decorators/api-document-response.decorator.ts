import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export const ApiDocumentResponse = <T>(params: {
  status?: HttpStatus;
  message: string;
  model: ClassConstructor<T>;
}) => {
  return applyDecorators(
    ApiExtraModels(params.model),
    ApiResponse({
      status: params.status || HttpStatus.OK,
      description: params.message,
      schema: { $ref: getSchemaPath(params.model) }
    })
  );
};
