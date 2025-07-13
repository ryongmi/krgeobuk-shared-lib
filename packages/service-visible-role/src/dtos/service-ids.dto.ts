import { IsValidServiceIds } from '@krgeobuk/shared/service';

import { ServiceIds } from '../interfaces/service-ids.interface.js';

export class ServiceIdsDto implements ServiceIds {
  @IsValidServiceIds()
  serviceIds!: string[];
}
