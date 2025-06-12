import { IsValidEmail, IsValidPassword } from '@krgeobuk/user/src/decorators';

export class UserLoginDto {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}

