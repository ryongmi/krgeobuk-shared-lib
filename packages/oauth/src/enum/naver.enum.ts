export enum NaverTokenType {
  BEARER = 'bearer',
  MAC = 'mac',
}

// 배열이 필요할 때 사용하도록 따로 export
export const NAVER_TOKEN_TYPE_VALUES = Object.values(NaverTokenType);
