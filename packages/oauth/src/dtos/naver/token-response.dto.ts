import { IsValidAccessToken, IsValidRefreshToken } from '@krgeobuk/jwt/decorators';

import { IsValidNaverTokenType, IsValidNaverExpiresIn } from '@krgeobuk/oauth/src/decorators';
import type { NaverTokenType } from '@krgeobuk/oauth/src/enum';
import type { NaverTokenResponse } from '@krgeobuk/oauth/src/interfaces';

export class NaverTokenResponseDto implements NaverTokenResponse {
  @IsValidAccessToken()
  accessToken!: string;

  @IsValidRefreshToken()
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
