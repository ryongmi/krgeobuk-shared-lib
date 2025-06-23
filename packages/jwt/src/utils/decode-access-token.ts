import jwt from 'jsonwebtoken';

import type { DecodeAccessTokenOptions, JwtPayload } from '../interfaces/index.js';

export function decodeAccessToken(options: DecodeAccessTokenOptions): JwtPayload {
  const { token, secret } = options;

  return jwt.verify(token, secret) as JwtPayload;
}
