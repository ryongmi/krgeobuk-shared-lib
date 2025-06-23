import {
  ExposeEmail,
  ExposeNickname,
  ExposeProfileImage,
  ExposeUsername,
} from '../decorators/index.js';
import type { LoggedInUser } from '../interfaces/index.js';

export class LoggedInUserDto implements LoggedInUser {
  @ExposeEmail()
  email!: string;

  @ExposeUsername()
  name!: string;

  @ExposeNickname()
  nickname?: string | null;

  @ExposeProfileImage()
  profileImage?: string | null;

  // @Expose()
  // isEmailVerified: IsEmailVerifiedDto;

  // @Expose()
  // isIntegrated: IsEmailVerifiedDto;
}
