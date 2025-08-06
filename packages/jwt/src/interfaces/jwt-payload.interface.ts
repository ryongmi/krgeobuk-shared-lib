export interface JwtPayload {
  sub: string;
  tokenData?: unknown | undefined | null;
}

export interface VerifiedJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}

export interface AuthenticatedUser {
  userId: string;
  tokenData?: unknown | undefined | null;
  iat: number;
  exp: number;
}

