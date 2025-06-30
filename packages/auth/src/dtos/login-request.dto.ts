import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/decorators';
import type { AuthLoginRequest } from '../interfaces/index.js';

export class AuthLoginRequestDto implements AuthLoginRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
