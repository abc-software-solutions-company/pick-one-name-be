export interface IResponseFormat<T> {
  statusCode: number;
  message: string | string[];
  data: T;
  meta?: unknown;
}
