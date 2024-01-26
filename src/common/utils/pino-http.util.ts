import { Request } from 'express';
import { Options } from 'pino-http';

function bindings(bindingsObject: Record<string, any>) {
  const { ...others } = bindingsObject;

  return {
    ...others,
    app: 'pick-one-name-be',
    environment: process.env.ENVIRONMENT_NAME || 'development'
  };
}

export const pinoOptions: Options = {
  redact: {
    paths: ['*.headers.authorization', '*.headers.cookie']
  },
  genReqId: req => req.headers['x-request-id'],
  autoLogging: false,
  quietReqLogger: true,
  useLevel: 'info',
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  formatters: {
    bindings,
    level: (label: string) => ({ level: label }),
    log(object: Record<string, any>) {
      const { context, req, ...rest } = object;

      if (req) {
        const { method, id, url, query } = req as Request;

        rest.method = method;
        rest.id = id;
        rest.url = url;
        rest.query = query;
        rest.body = req.body;
      }

      return { context, meta: rest };
    }
  }
};

export const pinoDevOptions: Options = {
  redact: {
    paths: ['*.headers.authorization', '*.headers.cookie']
  },
  transport: {
    target: 'pino-pretty',
    options: { colorize: true, singleLine: true }
  },
  autoLogging: false,
  genReqId: req => req.headers['x-request-id'],
  useLevel: 'info',
  serializers: {
    req: req => {
      const { method, id, url, query } = req;

      return { body: req.body, id, method, url, query };
    }
  }
};
