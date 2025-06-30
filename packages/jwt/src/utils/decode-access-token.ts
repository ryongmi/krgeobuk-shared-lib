import jwt from 'jsonwebtoken';

import type { JwtDecodeAccessTokenOptions, JwtPayload } from '../interfaces/index.js';

export function decodeAccessToken(options: JwtDecodeAccessTokenOptions): JwtPayload {
  const { token, publicKey } = options;

  return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;
}
