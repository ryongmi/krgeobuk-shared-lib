import {
  ExposeEmail,
  ExposeNickname,
  ExposeProfileImage,
  ExposeUsername,
} from '@krgeobuk/user/src/decorators';
import type { LoggedInUser } from '@krgeobuk/user/src/interfaces';

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
