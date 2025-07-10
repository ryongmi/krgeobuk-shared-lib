import type { UuidId } from '@krgeobuk/core/interfaces';

export interface UpdatePermission extends UuidId {
  action?: string;
  description?: string | null;
  serviceId?: string;
}