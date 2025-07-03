import type { PaginateBaseOptions } from '@krgeobuk/core/interfaces';

export interface RoleSearchQuery extends PaginateBaseOptions {
  name?: string;
  serviceId?: string;
  // priority?: number;
}
