import { PageInfoWrapperDto } from '@krgeobuk/core/dtos';
import { ExposeUuidId, ExposeNested } from '@krgeobuk/core/decorators';
import { PaginatedResult } from '@krgeobuk/core/interfaces';
import {
  ExposeServiceName,
  ExposeBaseUrl,
  ExposeIsVisible,
  ExposeIsVisibleByRole,
  ExposeDisplayName,
  ExposeVisibleRoleCount,
} from '@krgeobuk/shared/service';

import type { ServiceSearchResult } from '../interfaces/index.js';

export class ServiceSearchResultDto implements ServiceSearchResult {
  @ExposeUuidId()
  id!: string;

  @ExposeServiceName()
  name!: string;

  @ExposeBaseUrl()
  baseUrl!: string | null;

  @ExposeIsVisible()
  isVisible!: boolean;

  @ExposeIsVisibleByRole()
  isVisibleByRole!: boolean;

  @ExposeDisplayName()
  displayName!: string | null;

  @ExposeVisibleRoleCount()
  visibleRoleCount: number = 0;
}

export class ServicePaginatedSearchResultDto
  extends PageInfoWrapperDto
  implements PaginatedResult<ServiceSearchResultDto>
{
  @ExposeNested({
    type: ServiceSearchResultDto,
    typeFn: () => ServiceSearchResultDto,
    description: '응답 데이터 목록',
    options: { isArray: true },
  })
  items!: ServiceSearchResultDto[];
}

