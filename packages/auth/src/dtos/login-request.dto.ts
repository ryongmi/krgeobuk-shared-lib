import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/decorators';
import type { LoginRequest } from '../interfaces/index.js';

export class LoginRequestDto implements LoginRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
