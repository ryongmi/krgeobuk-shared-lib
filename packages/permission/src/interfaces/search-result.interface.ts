import type { Service } from '@krgeobuk/shared/service';

export interface PermissionSearchResult {
  id: string;
  action: string;
  description: string | null;
  roleCount: number;
  service: Service;
}

