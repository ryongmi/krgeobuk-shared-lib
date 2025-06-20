import { IsValidAccessToken } from '@krgeobuk/auth/src/decorators';
import type { RefreshResponse } from '@krgeobuk/auth/src/interfaces';

export class RefreshResponseDto implements RefreshResponse {
  @IsValidAccessToken({ isExpose: true })
  accessToken!: string;
}
