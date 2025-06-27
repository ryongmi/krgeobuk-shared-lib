import type { ProviderType } from '@krgeobuk/oauth/enum';

export interface SearchResult {
  id: string;
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  provider: ProviderType;
  isIntegrated: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
