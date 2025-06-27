import jwt from 'jsonwebtoken';

import type { DecodeAccessTokenOptions, JwtPayload } from '../interfaces/index.js';

export function decodeAccessToken(options: DecodeAccessTokenOptions): JwtPayload {
  const { token, publicKey } = options;

  return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;
}
