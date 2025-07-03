import { IsValidPassword } from '@krgeobuk/shared/user';

import type { ChangePassword } from '../interfaces/index.js';

export class ChangePasswordDto implements ChangePassword {
  @IsValidPassword()
  currentPassword!: string;

  @IsValidPassword()
  newPassword!: string;
}
