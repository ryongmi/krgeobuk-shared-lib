import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';

import { ExposeProvider, ExposeProviderId } from '../../decorators/index.js';
import type { OAuthAccount } from '../../interfaces/index.js';
import type { ProviderType } from '../../enum/index.js';

export class OAuthAccountDto extends ExposeUuidIdDto implements OAuthAccount {
  @ExposeProviderId()
  providerId?: string;

  @ExposeProvider()
  provider?: ProviderType;
}
