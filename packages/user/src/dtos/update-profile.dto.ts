import { IsValidNickname, IsValidProfileImageUrl } from '@krgeobuk/shared/user';

import type { UpdateMyProfile } from '../interfaces/index.js';

export class UpdateMyProfileDto implements UpdateMyProfile {
  @IsValidNickname()
  nickname!: string;

  @IsValidProfileImageUrl()
  profileImageUrl!: string;
}
