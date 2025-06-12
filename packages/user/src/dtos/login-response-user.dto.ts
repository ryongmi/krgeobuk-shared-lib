import {
  IsValidEmail,
  IsValidNickname,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/src/decorators';

export class LoginResponseUserDto {
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

