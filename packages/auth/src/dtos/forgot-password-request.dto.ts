import { IsValidEmail } from '@krgeobuk/shared/user';
import type { ForgotPasswordRequest } from '../interfaces/index.js';

export class ForgotPasswordRequestDto implements ForgotPasswordRequest {
  @IsValidEmail()
  email!: string;
}
