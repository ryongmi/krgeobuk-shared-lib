import {
  IsValidGoogleAccessToken,
  IsValidGoogleRefreshToken,
  IsValidGoogleTokenType,
  IsValidGoogleExpiresIn,
  IsValidGoogleScope,
} from '@krgeobuk/oauth/src/decorators';
import type { GoogleTokenType } from '@krgeobuk/oauth/src/enum';
import type { GoogleTokenResponse } from '@krgeobuk/oauth/src/interfaces';

export class GoogleTokenResponseDto implements GoogleTokenResponse {
  @IsValidGoogleAccessToken()
  accessToken!: string;

  @IsValidGoogleTokenType()
  tokenType!: GoogleTokenType;

  @IsValidGoogleExpiresIn()
  expiresIn!: number;

  @IsValidGoogleScope()
  scope!: string;

  @IsValidGoogleRefreshToken({ isOptional: true })
  refreshToken?: string;
}
