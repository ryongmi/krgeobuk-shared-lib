import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';

import { ExposeProvider } from '../../decorators/index.js';
import type { OAuthAccountSearchResult } from '../../interfaces/index.js';
import type { OAuthAccountProviderType } from '../../enum/index.js';

export class OAuthAccountSearchResultDto
  extends ExposeUuidIdDto
  implements OAuthAccountSearchResult
{
  @ExposeProvider()
  provider!: OAuthAccountProviderType;
}
