import { PaginateResultBaseDto } from '@krgeobuk/core/dtos';
import { ExposeUuidId, ExposeNested } from '@krgeobuk/core/decorators';
import { PaginatedResult } from '@krgeobuk/core/interfaces';
import { ServiceDto } from '@krgeobuk/shared/service';
import {
  ExposeRoleName,
  ExposeDescription,
  ExposePriority,
  ExposeUserCount,
} from '@krgeobuk/shared/role';

import type { RoleSearchResult } from '../interfaces/index.js';

export class RoleSearchResultDto implements RoleSearchResult {
  @ExposeUuidId()
  id!: string;

  @ExposeRoleName()
  name!: string;

  @ExposeDescription()
  description!: string | null;

  @ExposePriority()
  priority!: number;

  @ExposeUserCount()
  userCount: number = 0;

  @ExposeNested({
    type: ServiceDto,
    typeFn: () => ServiceDto,
    description: '해당 Role이 속한 서비스',
  })
  service!: ServiceDto;
}

export class RolePaginatedSearchResultDto
  extends PaginateResultBaseDto
  implements PaginatedResult<RoleSearchResultDto>
{
  @ExposeNested({
    type: RoleSearchResultDto,
    typeFn: () => RoleSearchResultDto,
    description: '응답 데이터 목록',
    options: { isArray: true },
  })
  items!: RoleSearchResultDto[];
}
