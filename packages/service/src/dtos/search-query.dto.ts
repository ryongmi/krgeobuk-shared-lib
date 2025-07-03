import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidServiceName, IsValidIsVisible } from '@krgeobuk/shared/service';

import type { ServiceSearchQuery } from '../interfaces/index.js';

export class ServiceSearchQueryDto extends PaginateBaseDto implements ServiceSearchQuery {
  @IsValidServiceName({ isOptional: true })
  name?: string;

  @IsValidIsVisible({ isOptional: true })
  isVisible?: boolean;
}
