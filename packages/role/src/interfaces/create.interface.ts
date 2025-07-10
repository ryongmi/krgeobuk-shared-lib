export interface CreateRole {
  name: string;
  description?: string | null;
  priority: number;
  serviceId: string;
}
