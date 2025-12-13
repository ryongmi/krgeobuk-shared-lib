import type { UuidId } from '@krgeobuk/core/interfaces';

export interface User extends UuidId {
  email?: string;
  password?: string;
  name?: string;
  nickname?: string | null;
  profileImageUrl?: string | null;
  isEmailVerified?: boolean;
}

