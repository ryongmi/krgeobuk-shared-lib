export interface RoleFilter {
  name?: string;
  description?: string;
  priority?: number;
  serviceId?: string;
}

export interface UserRoleFilter {
  userId?: string;
  roleId?: string;
}
