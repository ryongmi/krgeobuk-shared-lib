import { NaverTokenResponse, NaverUserProfileResponse } from '../../interfaces';

export interface NaverInfoResponse {
  tokenData: NaverTokenResponse;
  naverUserInfo: NaverUserProfileResponse;
}
