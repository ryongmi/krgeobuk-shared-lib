import { PageInfoWrapperDto } from '@krgeobuk/core/dtos';
import { ExposeUuidId, ExposeNested } from '@krgeobuk/core/decorators';
import { PaginatedResult } from '@krgeobuk/core/interfaces';
import { ServiceDto } from '@krgeobuk/shared/service';
import {
  ExposePermissionAction,
  ExposePermissionDescription,
  ExposeRoleCount,
} from '@krgeobuk/shared/permission';

import type { PermissionSearchResult } from '../interfaces/index.js';

export class PermissionSearchResultDto implements PermissionSearchResult {
  @ExposeUuidId()
  id!: string;

  @ExposePermissionAction()
  action!: string;

  @ExposePermissionDescription()
  description!: string | null;

  @ExposeRoleCount()
  roleCount: number = 0;

  @ExposeNested({
    type: ServiceDto,
    typeFn: () => ServiceDto,
    description: '해당 Permission이 속한 서비스',
  })
  service!: ServiceDto;
}

export class PermissionPaginatedSearchResultDto
  extends PageInfoWrapperDto
  implements PaginatedResult<PermissionSearchResultDto>
{
  @ExposeNested({
    type: PermissionSearchResultDto,
    typeFn: () => PermissionSearchResultDto,
    description: '응답 데이터 목록',
    options: { isArray: true },
  })
  items!: PermissionSearchResultDto[];
}
