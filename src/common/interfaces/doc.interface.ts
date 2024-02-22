import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
}

export interface IDocResponseOptions<T> {
  statusCode?: number;
  httpStatus?: HttpStatus;
  classSerialization?: ClassConstructor<T>;
  message?: string;
}

export interface IDocAuthOptions {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
}

export interface IDocOptions<T> {
  response?: IDocResponseOptions<T>[];
  request?: IDocRequestOptions;
  auth?: IDocAuthOptions;
}

export interface IDocDefaultOptions {
  httpStatus: HttpStatus;
  message: string;
  statusCode: number;
  classSerialization?: ClassConstructor<any>;
}

export interface IDocOfOptions {
  message: string;
  statusCode: number;
  classSerialization?: ClassConstructor<any>;
}

export interface IDocPagingResponseOptions<T> extends Pick<IDocResponseOptions<T>, 'statusCode'> {
  classSerialization: ClassConstructor<T>;
}

export interface IDocPagingOptions<T> extends Omit<IDocOptions<T>, 'response' | 'request'> {
  response: IDocPagingResponseOptions<T>;
  request?: IDocRequestOptions;
}
