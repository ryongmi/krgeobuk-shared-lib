import { ExposeHasRole } from '../validation/index.js';
import type { RoleCheckResponse } from '../interfaces/index.js';

export class RoleCheckResponseDto implements RoleCheckResponse {
  @ExposeHasRole()
  hasRole!: boolean;
}

