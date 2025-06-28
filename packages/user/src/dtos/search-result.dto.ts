import { ExposeUuidIdDto, PaginateResultBaseDto } from '@krgeobuk/core/dtos';
import { ExposeNested } from '@krgeobuk/core/decorators';
import { PaginatedResult } from '@krgeobuk/core/interfaces';
import { OAuthAccountDto } from '@krgeobuk/oauth/dtos';

import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '../decorators/index.js';
import type { SearchResult } from '../interfaces/index.js';

export class SearchResultDto extends ExposeUuidIdDto implements SearchResult {
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

export class PaginatedSearchResultDto
  extends PaginateResultBaseDto
  implements PaginatedResult<SearchResultDto>
{
  @ExposeNested({
    type: SearchResultDto,
    typeFn: () => SearchResultDto,
    description: '응답 데이터 목록',
    options: { isArray: true },
  })
  items!: SearchResultDto[];
}
