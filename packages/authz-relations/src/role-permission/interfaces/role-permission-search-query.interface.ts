import type { PaginateQuery } from '@krgeobuk/core/interfaces';

export interface RolePermissionSearchQuery extends PaginateQuery {
  roleId?: string;
  permissionId?: string;
}