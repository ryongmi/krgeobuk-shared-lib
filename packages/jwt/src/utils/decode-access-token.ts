import jwt from 'jsonwebtoken';

import type { JwtDecodeAccessTokenOptions, VerifiedJwtPayload } from '../interfaces/index.js';

export function decodeAccessToken(options: JwtDecodeAccessTokenOptions): VerifiedJwtPayload {
  const { token, publicKey } = options;

  return jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as VerifiedJwtPayload;
}

