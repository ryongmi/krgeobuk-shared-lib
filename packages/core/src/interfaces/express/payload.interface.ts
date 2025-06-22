// packages\user\src\interfaces\logged-in-user.interface.ts
export interface UserPayload {
  email: string;
  name: string;
  nickname?: string | null;
  profileImage?: string | null;
  // email: string;
}

// packages\jwt\src\interfaces\jwt-payload.interface.ts
export interface JwtPayload {
  id: string;
  tokenData?: unknown | undefined | null;
}
