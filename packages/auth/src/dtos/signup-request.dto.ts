import {
  IsValidEmail,
  IsValidNickname,
  IsValidPassword,
  IsValidProfileImageUrl,
  IsValidUsername,
} from '@krgeobuk/shared/user';

import type { AuthSignupRequest } from '../interfaces/index.js';

export class AuthSignupRequestDto implements AuthSignupRequest {
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
