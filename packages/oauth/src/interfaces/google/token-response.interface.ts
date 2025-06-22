import type { GoogleTokenType } from '../../enum';

export interface GoogleTokenResponse {
  accessToken: string;
  expiresIn: number;
  scope: string;
  tokenType: GoogleTokenType;
  refreshToken?: string;
  // idToken: string;
}

//   {
//   "access_token": "ACCESS_TOKEN",
//   "expires_in": 3599,
//   "refresh_token": "REFRESH_TOKEN",
//   "scope": "profile email",
//   "token_type": "Bearer"
// }
