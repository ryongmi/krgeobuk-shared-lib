import { ExposeAccessToken } from '@krgeobuk/jwt/decorators';
import type { RefreshResponse } from '../interfaces/index.js';

export class RefreshResponseDto implements RefreshResponse {
  @ExposeAccessToken()
  accessToken!: string;
}
