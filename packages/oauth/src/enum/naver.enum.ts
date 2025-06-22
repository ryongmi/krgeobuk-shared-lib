export enum NaverTokenType {
  BEARER = 'bearer',
  MAC = 'mac',
}

// 배열이 필요할 때 사용하도록 따로 export
export const NAVER_TOKEN_TYPE_KEYS = Object.keys(NaverTokenType);
export const NAVER_TOKEN_TYPE_VALUES = Object.values(NaverTokenType);

export enum NaverGenderType {
  F = '여성',
  M = '남성',
  U = '확인불가',
}

// 배열이 필요할 때 사용하도록 따로 export
export const NAVER_GENDER_TYPE_KEYS = Object.keys(NaverGenderType);
export const NAVER_GENDER_TYPE_VALUES = Object.values(NaverGenderType);
