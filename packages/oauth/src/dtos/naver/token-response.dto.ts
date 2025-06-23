import {
  IsValidNaverAccessToken,
  IsValidNaverRefreshToken,
  IsValidNaverTokenType,
  IsValidNaverExpiresIn,
} from '../../decorators/index.js';
import type { NaverTokenType } from '../../enum/index.js';
import type { NaverTokenResponse } from '../../interfaces/index.js';

export class NaverTokenResponseDto implements NaverTokenResponse {
  @IsValidNaverAccessToken()
  accessToken!: string;

  @IsValidNaverRefreshToken()
  refreshToken!: string;

  @IsValidNaverTokenType()
  tokenType!: NaverTokenType;

  @IsValidNaverExpiresIn()
  expiresIn!: number;
}

// {
//     "access_token":"AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg",
//     "refresh_token":"c8ceMEJisO4Se7uGisHoX0f5JEii7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY",
//     "token_type":"bearer",
//     "expires_in":"3600"
// }
