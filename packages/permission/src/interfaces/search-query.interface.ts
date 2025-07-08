import type { PaginateBaseOptions } from '@krgeobuk/core/interfaces';

export interface PermissionSearchQuery extends PaginateBaseOptions {
  action?: string;
  serviceId?: string;
}
