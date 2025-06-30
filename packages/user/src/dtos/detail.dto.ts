import { ExposeNested, ExposeUuidId, ExposeCreatedAt } from '@krgeobuk/core/decorators';
import { OAuthAccountDto } from '@krgeobuk/oauth/dtos';

import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '../decorators/index.js';
import type { UserDetail } from '../interfaces/index.js';

export class UserDetailDto implements UserDetail {
  @ExposeUuidId()
  id?: string;

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

  @ExposeCreatedAt()
  createdAt!: Date;

  @ExposeNested({
    type: OAuthAccountDto,
    typeFn: () => OAuthAccountDto,
    description: '해당 User의 OAuth 데이터',
  })
  oauthAccount!: OAuthAccountDto;
}
