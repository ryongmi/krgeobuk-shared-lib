import {
  IsValidEmail,
  IsValidNickname,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/src/decorators';
import type { LoggedInUser } from '@krgeobuk/user/src/interfaces';

export class LoggedInUserDto implements LoggedInUser {
  @IsValidEmail({ isExpose: true })
  email!: string;

  @IsValidUsername({ isExpose: true })
  name!: string;

  @IsValidNickname({ isOptional: true, isExpose: true })
  nickname?: string;

  @IsValidProfileImage({ isOptional: true, isExpose: true })
  profileImage?: string;

  // @Expose()
  // isEmailVerified: IsEmailVerifiedDto;

  // @Expose()
  // isIntegrated: IsEmailVerifiedDto;
}
