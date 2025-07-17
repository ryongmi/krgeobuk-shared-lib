import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface Role extends OptionalUuidId {
  name?: string;
  description?: string | null;
  priority?: number;
  serviceId?: string;
}
