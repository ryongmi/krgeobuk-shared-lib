import { ExposeRedirectUrl } from '@krgeobuk/shared/user';

import type { AuthLoginResponse } from '../interfaces/index.js';

export class AuthLoginResponseDto implements AuthLoginResponse {
  @ExposeRedirectUrl()
  redirectUrl!: string;
}

