import jwt from 'jsonwebtoken';

import type { DecodeAccessTokenOptions, JwtPayload } from '@krgeobuk/jwt/src/interfaces';

export function decodeAccessToken(options: DecodeAccessTokenOptions): JwtPayload {
  const { token, secret } = options;

  return jwt.verify(token, secret) as JwtPayload;
}
