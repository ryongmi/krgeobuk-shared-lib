import { ExposeRoleList, ExposePermissionList } from '@krgeobuk/shared/authorization';

import type { UserAuthorization } from '../interfaces/index.js';

export class UserAuthorizationDto implements UserAuthorization {
  @ExposeRoleList()
  roles!: string[];

  @ExposePermissionList()
  permissions!: string[];
}
