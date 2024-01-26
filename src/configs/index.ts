import AppConfig from './app.config';
import AuthConfig from './auth.config';
import CacheConfig from './cache.config';
import DatabaseConfig from './database.config';
import HttpConfig from './http.config';
import MiddlewaresConfig from './middlewares.config';
import RedisConfig from './redis.config';

export default [CacheConfig, DatabaseConfig, AppConfig, AuthConfig, HttpConfig, MiddlewaresConfig, RedisConfig];
