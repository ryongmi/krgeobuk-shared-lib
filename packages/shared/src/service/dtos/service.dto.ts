import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';

import {
  ExposeServiceName,
  ExposeDescription,
  ExposeBaseUrl,
  ExposeIsVisible,
  ExposeIsVisibleByRole,
  ExposeDisplayName,
  ExposeIconUrl,
} from '../validation/index.js';
import type { Service } from '../interfaces/index.js';

export class ServiceDto extends ExposeUuidIdDto implements Service {
  @ExposeServiceName()
  name?: string;

  @ExposeDescription()
  description?: string;

  @ExposeBaseUrl()
  baseUrl?: string;

  @ExposeIsVisible()
  isVisible?: boolean;

  @ExposeIsVisibleByRole()
  isVisibleByRole?: boolean;

  @ExposeDisplayName()
  displayName?: string;

  @ExposeIconUrl()
  iconUrl?: string;
}
