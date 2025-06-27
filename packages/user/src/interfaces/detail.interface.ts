import type { ProviderType } from '@krgeobuk/oauth/enum';

export interface Detail {
  email: string;
  name: string;
  nickname: string | null;
  profileImage: string | null;
  provider: ProviderType;
}
