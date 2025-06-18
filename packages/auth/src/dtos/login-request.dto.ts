import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/decorators';
import type { LoginRequest } from '@krgeobuk/auth/src/interfaces';

export class LoginRequestDto implements LoginRequest {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
