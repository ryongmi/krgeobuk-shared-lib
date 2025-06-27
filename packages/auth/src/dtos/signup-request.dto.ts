import { OptionalUuidIdDto } from '@krgeobuk/core/dtos';
import {
  IsValidEmail,
  IsValidNickname,
  IsValidPassword,
  IsValidProfileImageUrl,
  IsValidUsername,
} from '@krgeobuk/user/decorators';
import type { SignupRequest } from '../interfaces/index.js';

export class SignupRequestDto extends OptionalUuidIdDto implements SignupRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;

  @IsValidUsername()
  name!: string;

  @IsValidNickname({ isOptional: true })
  nickname?: string;

  @IsValidProfileImageUrl({ isOptional: true })
  profileImageUrl?: string;
}
