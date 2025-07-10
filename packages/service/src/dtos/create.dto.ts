import {
  IsValidServiceName,
  IsValidDescription,
  IsValidBaseUrl,
  IsValidIsVisible,
  IsValidIsVisibleByRole,
  IsValidDisplayName,
  IsValidIconUrl,
} from '@krgeobuk/shared/service';

import type { CreateService } from '../interfaces/index.js';

export class CreateServiceDto implements CreateService {
  @IsValidServiceName()
  name!: string;

  @IsValidDescription({ isOptional: true })
  description?: string | null;

  @IsValidBaseUrl({ isOptional: true })
  baseUrl?: string | null;

  @IsValidIsVisible()
  isVisible!: boolean;

  @IsValidIsVisibleByRole()
  isVisibleByRole!: boolean;

  @IsValidDisplayName({ isOptional: true })
  displayName?: string | null;

  @IsValidIconUrl({ isOptional: true })
  iconUrl?: string | null;
}
