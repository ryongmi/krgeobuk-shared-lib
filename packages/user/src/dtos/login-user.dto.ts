import {
  IsValidEmail,
  IsValidNickname,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/src/decorators';
import type { LoginUser } from '@krgeobuk/user/src/interfaces';

export class LoginUserDto implements LoginUser {
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
}
