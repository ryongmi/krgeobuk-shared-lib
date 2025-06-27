import { IsValidNickname, IsValidProfileImage } from '../decorators/index.js';
import type { UpdateMyProfile } from '../interfaces/index.js';

export class UpdateMyProfileDto implements UpdateMyProfile {
  @IsValidNickname()
  nickname!: string;

  @IsValidProfileImage()
  profileImage!: string;
}
