import { OptionalUuidIdDto } from '@krgeobuk/core/dtos';
import {
  IsValidEmail,
  IsValidNickname,
  IsValidPassword,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/decorators';
import type { SignupRequest } from '@krgeobuk/auth/src/interfaces';

export class SignupRequestDto extends OptionalUuidIdDto implements SignupRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;

  @IsValidUsername()
  name!: string;

  @IsValidNickname({ isOptional: true })
  nickname?: string;

  @IsValidProfileImage({ isOptional: true })
  profileImage?: string;
}
