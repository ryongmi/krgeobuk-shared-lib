import type { Service } from '@krgeobuk/shared/service';

export interface RoleSearchResult {
  id: string;
  name: string;
  description: string | null;
  priority: number;
  userCount: number;
  service: Service;
}
