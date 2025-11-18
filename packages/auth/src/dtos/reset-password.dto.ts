import { IsValidResetToken, IsValidPassword, IsValidConfirmPassword } from '@krgeobuk/shared/user';
import type { ResetPassword } from '../interfaces/index.js';

export class ResetPasswordDto implements ResetPassword {
  @IsValidResetToken()
  token!: string;

  @IsValidPassword()
  password!: string;

  @IsValidConfirmPassword()
  confirmPassword!: string;
}
