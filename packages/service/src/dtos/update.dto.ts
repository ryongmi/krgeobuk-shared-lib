import { UuidIdDto } from '@krgeobuk/core/dtos';
import {
  IsValidServiceName,
  IsValidDescription,
  IsValidBaseUrl,
  IsValidIsVisible,
  IsValidIsVisibleByRole,
  IsValidDisplayName,
  IsValidIconUrl,
} from '@krgeobuk/shared/service';

import type { UpdateService } from '../interfaces/index.js';

export class UpdateServiceDto extends UuidIdDto implements UpdateService {
  @IsValidServiceName({ isOptional: true })
  name?: string;

  @IsValidDescription({ isOptional: true })
  description?: string | null;

  @IsValidBaseUrl({ isOptional: true })
  baseUrl?: string | null;

  @IsValidIsVisible({ isOptional: true })
  isVisible?: boolean;

  @IsValidIsVisibleByRole({ isOptional: true })
  isVisibleByRole?: boolean;

  @IsValidDisplayName({ isOptional: true })
  displayName?: string | null;

  @IsValidIconUrl({ isOptional: true })
  iconUrl?: string | null;
}

