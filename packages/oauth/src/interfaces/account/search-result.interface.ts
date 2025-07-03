import type { OptionalUuidId } from '@krgeobuk/core/interfaces';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

export interface OAuthAccountSearchResult extends OptionalUuidId {
  provider: OAuthAccountProviderType;
}
