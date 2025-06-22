import {
  IsValidGoogleAccessToken,
  IsValidGoogleRefreshToken,
  IsValidGoogleTokenType,
  IsValidGoogleExpiresIn,
  IsValidGoogleScope,
} from '../../decorators';
import type { GoogleTokenType } from '../../enum';
import type { GoogleTokenResponse } from '../../interfaces';

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
