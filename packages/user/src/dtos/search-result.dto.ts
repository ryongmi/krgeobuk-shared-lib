import { PageInfoWrapperDto } from '@krgeobuk/core/dtos';
import { ExposeNested, ExposeUuidId } from '@krgeobuk/core/decorators';
import { PaginatedResult } from '@krgeobuk/core/interfaces';
import { OAuthAccountDto } from '@krgeobuk/shared/oauth';
import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '@krgeobuk/shared/user';

import type { UserSearchResult } from '../interfaces/index.js';

export class UserSearchResultDto implements UserSearchResult {
  @ExposeUuidId()
  id!: string;
  @ExposeEmail()
  email!: string;

  @ExposeUsername()
  name!: string;

  @ExposeNickname()
  nickname!: string | null;

  @ExposeProfileImageUrl()
  profileImageUrl!: string | null;

  @ExposeEmailVerified()
  isEmailVerified!: boolean;

  @ExposeNested({
    type: OAuthAccountDto,
    typeFn: () => OAuthAccountDto,
    description: '해당 User의 OAuth 데이터',
  })
  oauthAccount!: OAuthAccountDto;
}

export class UserPaginatedSearchResultDto
  extends PageInfoWrapperDto
  implements PaginatedResult<UserSearchResultDto>
{
  @ExposeNested({
    type: UserSearchResultDto,
    typeFn: () => UserSearchResultDto,
    description: '응답 데이터 목록',
    options: { isArray: true },
  })
  items!: UserSearchResultDto[];
}

