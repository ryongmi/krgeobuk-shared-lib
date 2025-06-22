import { GoogleTokenResponse, GoogleUserProfileResponse } from '@krgeobuk/oauth/src/interfaces';

export interface GoogleInfoResponse {
  tokenData: GoogleTokenResponse;
  googleUserInfo: GoogleUserProfileResponse;
}
