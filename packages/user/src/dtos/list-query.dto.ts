import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidProvider } from '@krgeobuk/oauth/decorators';
import type { ProviderType } from '@krgeobuk/oauth/enum';

import {
  IsValidEmail,
  IsValidNickname,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/src/decorators';
import type { ListQuery } from '@krgeobuk/user/src/interfaces';

export class ListQueryDto extends PaginateBaseDto implements ListQuery {
  @IsValidEmail({ isOptional: true })
  email?: string;

  @IsValidUsername({ isOptional: true })
  name?: string;

  @IsValidNickname({ isOptional: true })
  nickname?: string;

  @IsValidProfileImage({ isOptional: true })
  profileImage?: string;

  @IsValidProvider({ isOptional: true })
  provider?: ProviderType;
}
