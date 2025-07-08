import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface Permission extends OptionalUuidId {
  action?: string;
  description?: string;
  serviceId?: string;
}

