import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  getSchemaPath
} from '@nestjs/swagger';
import { isArray } from 'lodash';

import { IDocDefaultOptions, IDocOfOptions, IDocOptions, IDocPagingOptions } from '../interfaces/doc.interface';
import { ResponseSerialization } from '../serializations/response.serialization';
import { ResponsePagingSerialization } from '../serializations/response-paging.serialization';
import { Skip } from '../validations/skip.validation';

export function DocDefault<T>(options: IDocDefaultOptions): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseSerialization<T>) }],
    properties: {
      message: {
        example: options.message
      },
      statusCode: {
        type: 'number',
        example: options.statusCode
      }
    }
  };

  if (options.classSerialization) {
    docs.push(ApiExtraModels(options.classSerialization));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.classSerialization)
      }
    };
  }

  if (options.statusCode === 404) {
    docs.push(
      ApiNotFoundResponse({
        status: options.httpStatus,
        schema
      })
    );
  }

  return applyDecorators(
    ApiExtraModels(ResponseSerialization<T>),
    ApiResponse({
      status: options.httpStatus,
      schema
    }),
    ...docs
  );
}

export function Doc<T>(message: string, options: IDocOptions<T>): MethodDecorator {
  const docs = [];

  docs.push(ApiConsumes('application/json'));
  docs.push(ApiProduces('application/json'));

  if (isArray(options.response) && options.response?.length) {
    for (let i = 0; i < options.response.length; i++) {
      const doc = options.response[i];
      const normalDoc: IDocDefaultOptions = {
        httpStatus: doc.httpStatus ?? HttpStatus.OK,
        statusCode: doc.statusCode as number,
        message: doc.message || message
      };

      if (!normalDoc.statusCode) {
        normalDoc.statusCode = normalDoc.httpStatus;
      }

      if (doc.classSerialization) {
        normalDoc.classSerialization = doc.classSerialization;
      }
      docs.push(DocDefault(normalDoc));
    }
  }

  if (options?.request?.params) {
    docs.push(...options?.request?.params.map(param => ApiParam(param)));
  }

  if (options?.request?.queries) {
    docs.push(...options?.request?.queries.map(query => ApiQuery(query)));
  }

  const oneOfUnauthorized: IDocOfOptions[] = [];
  const oneOfForbidden: IDocOfOptions[] = [];

  // auth
  const auths = [];

  if (options?.auth?.jwtAccessToken) {
    auths.push(ApiBearerAuth('accessToken'));
    oneOfUnauthorized.push({
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED
    });
    oneOfForbidden.push({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Forbidden'
    });
  }

  return applyDecorators(
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      message: 'Service Unavailable',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      message: 'Request Timeout',
      statusCode: HttpStatus.REQUEST_TIMEOUT
    }),
    oneOfForbidden.length > 0 ? DocOneOf(HttpStatus.FORBIDDEN, ...oneOfForbidden) : Skip(),
    oneOfUnauthorized.length > 0 ? DocOneOf(HttpStatus.UNAUTHORIZED, ...oneOfUnauthorized) : Skip(),
    ...auths,
    ...docs
  );
}

export function DocOneOf<T>(httpStatus: HttpStatus, ...documents: IDocOfOptions[]): MethodDecorator {
  const docs = [];
  const oneOf = [];

  for (const doc of documents) {
    const oneOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseSerialization<T>) }],
      properties: {
        message: {
          example: doc.message
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode ?? HttpStatus.OK
        }
      }
    };

    if (doc.classSerialization) {
      docs.push(ApiExtraModels(doc.classSerialization));
      oneOfSchema.properties = {
        ...oneOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.classSerialization)
        }
      };
    }

    oneOf.push(oneOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        oneOf
      }
    }),
    ...docs
  );
}

export function DocPaging<T>(message: string, options: IDocPagingOptions<T>): MethodDecorator {
  //
  const docs = [];

  docs.push(ApiConsumes('application/json'));
  docs.push(ApiProduces('application/json'));

  if (options?.request?.params) {
    docs.push(...options?.request?.params.map(param => ApiParam(param)));
  }

  if (options?.request?.queries) {
    docs.push(...options?.request?.queries.map(query => ApiQuery(query)));
  }

  const oneOfUnauthorized: IDocOfOptions[] = [];
  const oneOfForbidden: IDocOfOptions[] = [];

  // auth
  const auths = [];

  if (options?.auth?.jwtAccessToken) {
    auths.push(ApiBearerAuth('accessToken'));
    oneOfUnauthorized.push({
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED
    });
    oneOfForbidden.push({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Forbidden'
    });
  }

  return applyDecorators(
    ApiExtraModels(ResponsePagingSerialization<T>),
    ApiExtraModels(options.response.classSerialization),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponsePagingSerialization<T>) }],
        properties: {
          message: {
            example: message
          },
          statusCode: {
            type: 'number',
            example: options.response.statusCode ?? HttpStatus.OK
          },
          data: {
            type: 'array',
            items: {
              $ref: getSchemaPath(options.response.classSerialization)
            }
          }
        }
      }
    }),
    ApiQuery({
      name: 'page',
      required: false,
      allowEmptyValue: false,
      example: 1,
      type: 'number',
      description: 'page number'
    }),
    ApiQuery({
      name: 'perPage',
      required: true,
      allowEmptyValue: false,
      example: 10,
      type: 'number',
      description: 'Data per page'
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      message: 'Service Unavailable',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      message: 'Request Timeout',
      statusCode: HttpStatus.REQUEST_TIMEOUT
    }),
    oneOfForbidden.length > 0 ? DocOneOf(HttpStatus.FORBIDDEN, ...oneOfForbidden) : Skip(),
    oneOfUnauthorized.length > 0 ? DocOneOf(HttpStatus.UNAUTHORIZED, ...oneOfUnauthorized) : Skip(),
    ...auths,
    ...docs
  );
}
