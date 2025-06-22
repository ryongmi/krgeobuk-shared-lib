import type { NaverTokenType } from '../../enum';

export interface NaverTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: NaverTokenType;
  expiresIn: number;
}

// {
//     "access_token":"AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg",
//     "refresh_token":"c8ceMEJisO4Se7uGisHoX0f5JEii7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY",
//     "token_type":"bearer",
//     "expires_in":"3600"
// }
