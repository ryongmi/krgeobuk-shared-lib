import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';

import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposePassword,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '../decorators/index.js';
import type { User } from '../interfaces/index.js';

export class UserDto extends ExposeUuidIdDto implements User {
  @ExposeEmail()
  email?: string;

  @ExposePassword()
  password?: string;

  @ExposeUsername()
  name?: string;

  @ExposeNickname()
  nickname?: string | null;

  @ExposeProfileImageUrl()
  profileImageUrl?: string | null;

  @ExposeIsIntegrated()
  isIntegrated?: boolean;

  @ExposeEmailVerified()
  isEmailVerified?: boolean;
}
