import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface User extends OptionalUuidId {
  email?: string;
  password?: string;
  name?: string;
  nickname?: string | null;
  profileImageUrl?: string | null;
  isIntegrated?: boolean;
  isEmailVerified?: boolean;
}
