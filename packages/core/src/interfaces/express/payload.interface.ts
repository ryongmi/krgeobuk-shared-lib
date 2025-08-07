// packages\user\src\interfaces\logged-in-user.interface.ts
export interface UserPayload {
  email: string;
  name: string;
  nickname?: string | null;
  profileImageUrl?: string | null;
  // email: string;
}

// packages\jwt\src\interfaces\jwt-payload.interface.ts
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

