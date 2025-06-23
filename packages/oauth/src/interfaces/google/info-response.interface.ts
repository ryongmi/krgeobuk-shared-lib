import { GoogleTokenResponse } from './token-response.interface.js';
import { GoogleUserProfileResponse } from './user-profile-response.interface.js';

export interface GoogleInfoResponse {
  tokenData: GoogleTokenResponse;
  googleUserInfo: GoogleUserProfileResponse;
}
