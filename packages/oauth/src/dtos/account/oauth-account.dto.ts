import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeUuidId } from '@krgeobuk/core/decorators';

import { ExposeProvider, ExposeProviderId } from '../../decorators/index.js';
import type { OAuthAccount } from '../../interfaces/index.js';
import type { OAuthAccountProviderType } from '../../enum/index.js';

export class OAuthAccountDto extends ExposeUuidIdDto implements OAuthAccount {
  @ExposeProviderId()
  providerId?: string;

  @ExposeProvider()
  provider?: OAuthAccountProviderType;

  @ExposeUuidId()
  userId?: string;
}
