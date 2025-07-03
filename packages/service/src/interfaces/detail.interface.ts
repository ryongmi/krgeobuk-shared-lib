import { Role } from '@krgeobuk/shared/role';
import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface ServiceDetail extends OptionalUuidId {
  name: string;
  description: string | null;
  baseUrl: string | null;
  isVisible: boolean;
  isVisibleByRole: boolean;
  displayName: string | null;
  iconUrl: string | null;
  visibleRoles: Role[];
}
