import type { OptionalUuidId } from '@krgeobuk/core/interfaces';
import type { Service } from '@krgeobuk/shared/service';
import type { User } from '@krgeobuk/shared/user';

export interface RoleDetail extends OptionalUuidId {
  name: string;
  description: string | null;
  priority: number;
  service: Service;
  users: User[];
}
