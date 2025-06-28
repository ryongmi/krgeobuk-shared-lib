import {
  ExposeUuidId,
  ExposeCreatedAt,
  ExposeUpdatedAt,
  ExposeDeletedAt,
} from '@krgeobuk/core/decorators';
import { createPaginatedDto } from '@krgeobuk/core/dtos';
import { ExposeProvider } from '@krgeobuk/oauth/decorators';
import type { ProviderType } from '@krgeobuk/oauth/enum';

import {
  ExposeEmail,
  ExposeEmailVerified,
  ExposeIsIntegrated,
  ExposeNickname,
  ExposeProfileImageUrl,
  ExposeUsername,
} from '../decorators/index.js';
import type { SearchResult } from '../interfaces/index.js';

export class SearchResultDto implements SearchResult {
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

  @ExposeProvider()
  provider!: ProviderType;

  @ExposeIsIntegrated()
  isIntegrated!: boolean;

  @ExposeEmailVerified()
  isEmailVerified!: boolean;

  @ExposeCreatedAt()
  createdAt!: Date;

  @ExposeUpdatedAt()
  updatedAt!: Date;

  @ExposeDeletedAt()
  deletedAt?: Date | null;
}

export const PaginatedSearchResultDto = createPaginatedDto(SearchResultDto);
