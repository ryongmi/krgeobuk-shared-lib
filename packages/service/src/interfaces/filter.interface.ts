export interface ServiceFilter {
  name?: string;
  description?: string;
  baseUrl?: string;
  isVisible?: boolean;
  isVisibleByRole?: boolean;
  displayName?: string;
  iconUrl?: string;
}

export interface ServiceVisibleRoleFilter {
  serviceId?: string;
  roleId?: string;
}
