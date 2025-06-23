import { NaverTokenResponse } from './token-response.interface.js';
import { NaverUserProfileResponse } from './user-profile-response.interface.js';

export interface NaverInfoResponse {
  tokenData: NaverTokenResponse;
  naverUserInfo: NaverUserProfileResponse;
}
