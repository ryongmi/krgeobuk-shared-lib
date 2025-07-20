import { UuidId } from '@krgeobuk/core/interfaces';
import { OAuthAccount } from '@krgeobuk/shared/oauth';
import { Service } from '@krgeobuk/shared/service';

import { UserAuthorization } from './authorization.interface.js';

export interface UserProfile extends UuidId {
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  isIntegrated: boolean;
  isEmailVerified: boolean;

  // OAuth 정보
  oauthAccount: OAuthAccount;

  // 권한 정보
  authorization: UserAuthorization;

  // 사용 가능한 서비스
  availableServices: Service[];
}
