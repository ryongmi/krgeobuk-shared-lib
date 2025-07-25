import type { UuidId } from '@krgeobuk/core/interfaces';

export interface Role extends UuidId {
  name?: string;
  description?: string | null;
  priority?: number;
  serviceId?: string;
}
