import { ExposeAccessToken } from '@krgeobuk/jwt/decorators';
import type { RefreshResponse } from '@krgeobuk/auth/src/interfaces';

export class RefreshResponseDto implements RefreshResponse {
  @ExposeAccessToken()
  accessToken!: string;
}
