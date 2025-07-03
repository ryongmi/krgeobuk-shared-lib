import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeNested } from '@krgeobuk/core/decorators';
import { RoleDto } from '@krgeobuk/shared/role';
import {
  ExposeServiceName,
  ExposeDescription,
  ExposeBaseUrl,
  ExposeIsVisible,
  ExposeIsVisibleByRole,
  ExposeDisplayName,
  ExposeIconUrl,
} from '@krgeobuk/shared/service';

import type { ServiceDetail } from '../interfaces/index.js';

export class ServiceDetailDto extends ExposeUuidIdDto implements ServiceDetail {
  @ExposeServiceName()
  name!: string;

  @ExposeDescription()
  description!: string | null;

  @ExposeBaseUrl()
  baseUrl!: string | null;

  @ExposeIsVisible()
  isVisible!: boolean;

  @ExposeIsVisibleByRole()
  isVisibleByRole!: boolean;

  @ExposeDisplayName()
  displayName!: string | null;

  @ExposeIconUrl()
  iconUrl!: string | null;

  @ExposeNested({
    type: RoleDto,
    typeFn: () => RoleDto,
    description: '해당 Serivce의 Visible 상태인 Role 데이터 목록',
    options: { isArray: true },
  })
  visibleRoles!: RoleDto[];
}
