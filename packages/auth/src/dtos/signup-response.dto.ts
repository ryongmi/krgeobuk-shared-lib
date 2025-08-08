import { ExposeRedirectUrl } from '@krgeobuk/shared/user';

import type { AuthSignupResponse } from '../interfaces/index.js';

export class AuthSignupResponseDto implements AuthSignupResponse {
  @ExposeRedirectUrl()
  redirectUrl!: string;
}

