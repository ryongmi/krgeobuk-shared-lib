export const OAuthAccountProviderType = {
  HOMEPAGE: 'homePage',
  GOOGLE: 'google',
  NAVER: 'naver',
} as const;

export type OAuthAccountProviderType =
  (typeof OAuthAccountProviderType)[keyof typeof OAuthAccountProviderType];

export const OAUTH_ACCOUNT_PROVIDER_TYPE_VALUES = Object.values(
  OAuthAccountProviderType
) as OAuthAccountProviderType[];
