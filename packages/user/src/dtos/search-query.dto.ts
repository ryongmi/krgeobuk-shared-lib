import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidProvider } from '@krgeobuk/oauth/decorators';
import type { ProviderType } from '@krgeobuk/oauth/enum';

import { IsValidEmail, IsValidNickname, IsValidUsername } from '../decorators/index.js';
import type { SearchQuery } from '../interfaces/index.js';

export class SearchQueryDto extends PaginateBaseDto implements SearchQuery {
  @IsValidEmail({ isOptional: true })
  email?: string;

  @IsValidUsername({ isOptional: true })
  name?: string;

  @IsValidNickname({ isOptional: true })
  nickname?: string;

  @IsValidProvider({ isOptional: true })
  provider?: ProviderType;
}
