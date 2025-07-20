import { ExposeNested, ExposeUuidId } from '@krgeobuk/core/decorators';
import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { OAuthAccountDto } from '@krgeobuk/shared/oauth';
import { ServiceDto } from '@krgeobuk/shared/service';
import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '@krgeobuk/shared/user';

import {UserAuthorizationDto} from './authorization.dto.js';
import type { UserProFile } from '../interfaces/index.js';

export class UserProFileDto extends ExposeUuidIdDto implements UserProFile  {
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

  @ExposeNested({
    type: UserAuthorizationDto,
    typeFn: () => UserAuthorizationDto,
    description: '해당 User의 권한 및 역할 목록 데이터',
  })
  authorization!: UserAuthorizationDto;

  @ExposeNested({
    type: ServiceDto,
    typeFn: () => ServiceDto,
    description: '해당 User가 사용가능한 Service 목록 데이터',
  })
  availableServices!: ServiceDto[];
}
