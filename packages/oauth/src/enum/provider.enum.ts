export enum ProviderType {
  HOMEPAGE = 'homePage',
  GOOGLE = 'google',
  NAVER = 'naver',
  // INTEGRATE = 'integrate',
}

// 배열이 필요할 때 사용하도록 따로 export
export const PROVIDER_TYPE_VALUES = Object.values(ProviderType);
