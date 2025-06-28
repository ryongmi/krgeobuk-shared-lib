import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';

import { ExposeProvider } from '../../decorators/index.js';
import type { SearchResult } from '../../interfaces/index.js';
import type { ProviderType } from '../../enum/index.js';

export class SearchResultDto extends ExposeUuidIdDto implements SearchResult {
  @ExposeProvider()
  provider!: ProviderType;
}
