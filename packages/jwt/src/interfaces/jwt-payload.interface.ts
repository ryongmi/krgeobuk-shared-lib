export interface JwtPayload {
  sub: string;
  tokenData?: unknown | undefined | null;
}

export interface VerifiedJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}

export interface AuthenticatedJwt {
  userId: string;
  tokenData?: unknown | undefined | null;
  iat: number;
  exp: number;
}

