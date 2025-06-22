import { GoogleTokenResponse, GoogleUserProfileResponse } from '../../interfaces';

export interface GoogleInfoResponse {
  tokenData: GoogleTokenResponse;
  googleUserInfo: GoogleUserProfileResponse;
}
