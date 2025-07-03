import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidProvider } from '@krgeobuk/shared/oauth';
import { IsValidEmail, IsValidNickname, IsValidUsername } from '@krgeobuk/shared/user';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

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
