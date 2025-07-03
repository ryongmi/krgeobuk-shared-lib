import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeProvider } from '@krgeobuk/shared/oauth';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

import type { OAuthAccountSearchResult } from '../../interfaces/index.js';

export class OAuthAccountSearchResultDto
  extends ExposeUuidIdDto
  implements OAuthAccountSearchResult
{
  @ExposeProvider()
  provider!: OAuthAccountProviderType;
}
