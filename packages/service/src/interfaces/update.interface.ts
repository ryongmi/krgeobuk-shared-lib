import type { UuidId } from '@krgeobuk/core/interfaces';

export interface UpdateService extends UuidId {
  name?: string;
  description?: string | null;
  baseUrl?: string | null;
  isVisible?: boolean;
  isVisibleByRole?: boolean;
  displayName?: string | null;
  iconUrl?: string | null;
}
