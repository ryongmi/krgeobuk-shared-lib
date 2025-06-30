import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';

import { ExposeProvider } from '../../decorators/index.js';
import type { OauthAccountSearchResult } from '../../interfaces/index.js';
import type { ProviderType } from '../../enum/index.js';

export class OauthAccountSearchResultDto
  extends ExposeUuidIdDto
  implements OauthAccountSearchResult
{
  @ExposeProvider()
  provider!: ProviderType;
}
