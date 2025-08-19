import { env } from './../../config/env';

export const JWT_CONSTANTS = {
  ACCESS_TOKEN_SECRET: env.JWT_ACCESS_SECRET || 'access-secret',
  ACCESS_TOKEN_EXPIRATION: '15m',
  REFRESH_TOKEN_SECRET: env.JWT_REFRESH_SECRET || 'refresh_secret',
  REFRESH_TOKEN_EXPIRATION: '7d',
};
