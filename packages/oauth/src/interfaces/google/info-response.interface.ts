import { GoogleTokenResponse, GoogleUserProfileResponse } from '../../interfaces/index.js';

export interface GoogleInfoResponse {
  tokenData: GoogleTokenResponse;
  googleUserInfo: GoogleUserProfileResponse;
}
