import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeNested } from '@krgeobuk/core/decorators';
import {
  ExposePermissionAction,
  ExposePermissionDescription,
  ExposeRoleCount,
} from '@krgeobuk/shared/permission';
import { RoleDto } from '@krgeobuk/shared/role';
import { ServiceDto } from '@krgeobuk/shared/service';

import type { PermissionDetail } from '../interfaces/index.js';

export class PermissionDetailDto extends ExposeUuidIdDto implements PermissionDetail {
  @ExposePermissionAction()
  action!: string;

  @ExposePermissionDescription()
  description!: string | null;

  @ExposeNested({
    type: ServiceDto,
    typeFn: () => ServiceDto,
    description: '해당 권한이 속한 서비스',
  })
  service!: ServiceDto;

  @ExposeNested({
    type: RoleDto,
    typeFn: () => RoleDto,
    description: '해당 권한을 사용하는 역활 목록',
    options: { isArray: true },
  })
  roles!: RoleDto[];
}

