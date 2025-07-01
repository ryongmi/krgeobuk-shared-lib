import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidProvider } from '@krgeobuk/oauth/decorators';
import type { OAuthAccountProviderType } from '@krgeobuk/oauth/enum';

import { IsValidEmail, IsValidNickname, IsValidUsername } from '../decorators/index.js';
import type { UserSearchQuery } from '../interfaces/index.js';

export class UserSearchQueryDto extends PaginateBaseDto implements UserSearchQuery {
  @IsValidEmail({ isOptional: true })
  email?: string;

  @IsValidUsername({ isOptional: true })
  name?: string;

  @IsValidNickname({ isOptional: true })
  nickname?: string;

  @IsValidProvider({ isOptional: true })
  provider?: OAuthAccountProviderType;
}
