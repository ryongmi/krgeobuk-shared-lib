import {
  ExposeEmail,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '@krgeobuk/shared/user';

import type { LoggedInUser } from '../interfaces/index.js';

export class LoggedInUserDto implements LoggedInUser {
  @ExposeEmail()
  email!: string;

  @ExposeUsername()
  name!: string;

  @ExposeNickname()
  nickname?: string | null;

  @ExposeProfileImageUrl()
  profileImageUrl?: string | null;

  // @Expose()
  // isEmailVerified: IsEmailVerifiedDto;

  // @Expose()
  // isIntegrated: IsEmailVerifiedDto;
}
