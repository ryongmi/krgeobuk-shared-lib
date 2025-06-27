import type { ProviderType } from '@krgeobuk/oauth/enum';

export interface Detail {
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  provider: ProviderType;
}
