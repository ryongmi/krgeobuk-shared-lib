import {
  IsValidGoogleAccessToken,
  IsValidGoogleRefreshToken,
  IsValidGoogleTokenType,
  IsValidGoogleExpiresIn,
  IsValidGoogleScope,
  IsValidGoogleTokenId,
} from '../../decorators/index.js';
import type { GoogleTokenType } from '../../enum/index.js';
import type { GoogleTokenResponse } from '../../interfaces/index.js';

export class GoogleTokenResponseDto implements GoogleTokenResponse {
  @IsValidGoogleAccessToken()
  accessToken!: string;

  @IsValidGoogleTokenType()
  tokenType!: GoogleTokenType;

  @IsValidGoogleExpiresIn()
  expiresIn!: number;

  @IsValidGoogleScope()
  scope!: string;

  @IsValidGoogleTokenId()
  idToken?: string;

  @IsValidGoogleRefreshToken({ isOptional: true })
  refreshToken?: string;
}

//   {
//   "access_token": "ACCESS_TOKEN",
//   "expires_in": 3599,
//   "scope": "profile email",
//   "id_token": 'eyJhbGciOiJSUzI1NiIsImtpZC...'
//   "token_type"?: "Bearer"
//   "refresh_token"?: "REFRESH_TOKEN",
// }
