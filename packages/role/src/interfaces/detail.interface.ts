import type { UuidId } from '@krgeobuk/core/interfaces';
import type { Service } from '@krgeobuk/shared/service';
import type { User } from '@krgeobuk/shared/user';

export interface RoleDetail extends UuidId {
  name: string;
  description: string | null;
  priority: number;
  service: Service;
  users: User[];
}

