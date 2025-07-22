import type { UuidId } from '@krgeobuk/core/interfaces';
import type { Service } from '@krgeobuk/shared/service';
import type { Role } from '@krgeobuk/shared/role';

export interface PermissionDetail extends UuidId {
  action: string;
  description: string | null;
  service: Service;
  roles: Role[];
}
