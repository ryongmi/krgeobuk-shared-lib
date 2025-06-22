import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/decorators';
import type { LoginRequest } from '../interfaces';

export class LoginRequestDto implements LoginRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
