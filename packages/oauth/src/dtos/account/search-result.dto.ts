import { ExposeUuidId } from '@krgeobuk/core/decorators';
import { ExposeProvider } from '@krgeobuk/shared/oauth';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

import type { OAuthAccountSearchResult } from '../../interfaces/index.js';

export class OAuthAccountSearchResultDto implements OAuthAccountSearchResult {
  @ExposeUuidId()
  id!: string;

  @ExposeProvider()
  provider!: OAuthAccountProviderType;
}
