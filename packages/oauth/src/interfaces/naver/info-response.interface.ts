import { NaverTokenResponse, NaverUserProfileResponse } from '../../interfaces/index.js';

export interface NaverInfoResponse {
  tokenData: NaverTokenResponse;
  naverUserInfo: NaverUserProfileResponse;
}
