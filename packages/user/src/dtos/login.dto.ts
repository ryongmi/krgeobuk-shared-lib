import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/src/decorators';
import type { Login } from '@krgeobuk/user/src/interfaces';

export class LoginDto implements Login {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
