import { NaverTokenResponse, NaverUserProfileResponse } from '@krgeobuk/oauth/src/interfaces';

export interface NaverInfoResponse {
  tokenData: NaverTokenResponse;
  naverUserInfo: NaverUserProfileResponse;
}
