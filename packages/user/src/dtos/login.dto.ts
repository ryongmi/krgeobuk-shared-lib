import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/src/decorators';
import { Login } from '@krgeobuk/user/src/interfaces';

export class LoginDto implements Login {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}
