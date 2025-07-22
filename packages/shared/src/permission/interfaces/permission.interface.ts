import type { UuidId } from '@krgeobuk/core/interfaces';

export interface Permission extends UuidId {
  action?: string;
  description?: string | null;
  serviceId?: string;
}

