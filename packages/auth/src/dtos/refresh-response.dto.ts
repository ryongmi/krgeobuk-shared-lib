import { ExposeAccessToken } from '@krgeobuk/jwt/decorators';
import type { AuthRefreshResponse } from '../interfaces/index.js';

export class AuthRefreshResponseDto implements AuthRefreshResponse {
  @ExposeAccessToken()
  accessToken!: string;
}
