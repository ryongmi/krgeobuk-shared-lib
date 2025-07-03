import { IsValidEmail, IsValidPassword } from '@krgeobuk/shared/user';

import type { AuthLoginRequest } from '../interfaces/index.js';

export class AuthLoginRequestDto implements AuthLoginRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
