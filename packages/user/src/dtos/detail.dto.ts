import { ExposeNested, ExposeUuidId } from '@krgeobuk/core/decorators';
import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { OAuthAccountDto } from '@krgeobuk/shared/oauth';
import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '@krgeobuk/shared/user';

import type { UserDetail } from '../interfaces/index.js';

export class UserDetailDto extends ExposeUuidIdDto implements UserDetail {
  @ExposeEmail()
  email!: string;

  @ExposeUsername()
  name!: string;

  @ExposeNickname()
  nickname!: string | null;

  @ExposeProfileImageUrl()
  profileImageUrl!: string | null;

  @ExposeIsIntegrated()
  isIntegrated!: boolean;

  @ExposeEmailVerified()
  isEmailVerified!: boolean;

  @ExposeNested({
    type: OAuthAccountDto,
    typeFn: () => OAuthAccountDto,
    description: '해당 User의 OAuth 데이터',
  })
  oauthAccount!: OAuthAccountDto;
}
