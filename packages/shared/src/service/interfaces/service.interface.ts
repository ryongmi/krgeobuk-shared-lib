import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface Service extends OptionalUuidId {
  name?: string;
  description?: string;
  baseUrl?: string;
  isVisible?: boolean;
  isVisibleByRole?: boolean;
  displayName?: string;
  iconUrl?: string;
}
