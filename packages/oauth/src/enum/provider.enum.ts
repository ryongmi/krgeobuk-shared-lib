export const ProviderType = {
  HOMEPAGE: 'homePage',
  GOOGLE: 'google',
  NAVER: 'naver',
} as const;

export type ProviderType = (typeof ProviderType)[keyof typeof ProviderType];

export const PROVIDER_TYPE_VALUES = Object.values(ProviderType) as ProviderType[];
