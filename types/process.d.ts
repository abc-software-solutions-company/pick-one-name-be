declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    // APP
    NEST_HOST: string;
    NEST_PORT: number;
    // MIDDLEWARE
    // - Cors
    CORS_ORIGIN: string | string[];
    CORS_ALLOW_METHODS: string[];
    CORS_ALLOW_HEADERS: string[];
    // - Rate Limit
    THROTTLE_TTL: number;
    THROTTLE_LIMIT: number;
    // HTTP
    REQUEST_TIMEOUT: number;
    // DATABASE
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_SCHEMA: string;
    DB_LOGS: string;
    // CACHE
    CACHE_TIME_TO_LIVE: number;
    // REDIS
    REDIS_HOST: string;
    REDIS_PORT: number;
    // AUTH
    JWT_SECRET_KEY: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET_KEY: string;
    JWT_REFRESH_EXPIRES_IN: string;
    // DOCUMENT
    DOCUMENTATION_ENABLED: string;
    // DEFAULT USER
    USER_EMAIL: string;
    USER_PASSWORD: string;
  }
}
