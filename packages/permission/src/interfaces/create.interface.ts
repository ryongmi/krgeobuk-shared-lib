export interface CreatePermission {
  action: string;
  description?: string | null;
  serviceId: string;
}