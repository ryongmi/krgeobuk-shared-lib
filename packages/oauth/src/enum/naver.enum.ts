export const NaverTokenType = {
  BEARER: 'bearer',
  MAC: 'mac',
} as const;

export type NaverTokenType = (typeof NaverTokenType)[keyof typeof NaverTokenType];

export const NAVER_TOKEN_TYPE_KEYS = Object.keys(NaverTokenType) as NaverTokenType[];
export const NAVER_TOKEN_TYPE_VALUES = Object.values(NaverTokenType) as NaverTokenType[];

export const NaverGenderType = {
  F: '여성',
  M: '남성',
  U: '확인불가',
} as const;

export type NaverGenderType = (typeof NaverGenderType)[keyof typeof NaverGenderType];

export const NAVER_GENDER_TYPE_KEYS = Object.keys(NaverGenderType) as NaverGenderType[];
export const NAVER_GENDER_TYPE_VALUES = Object.values(NaverGenderType) as NaverGenderType[];
