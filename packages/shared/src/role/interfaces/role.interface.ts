import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface Role extends OptionalUuidId {
  name?: string;
  description?: string;
  priority?: number;
  serviceId?: string;
}
