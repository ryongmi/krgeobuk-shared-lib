import jwt from 'jsonwebtoken';

import { DecodeAccessTokenOptions, JwtPayload } from '@krgeobuk/jwt/src/interfaces';

export function decodeAccessToken(options: DecodeAccessTokenOptions): JwtPayload {
  const { token, secret } = options;

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: unknown) {
    throw new Error(
      `Invalid Access Token: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
