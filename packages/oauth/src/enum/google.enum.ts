export enum GoogleTokenType {
  BEARER = 'Bearer',
}

// 배열이 필요할 때 사용하도록 따로 export
export const GOOGLE_TOKEN_TYPE_KEYS = Object.keys(GoogleTokenType);
export const GOOGLE_TOKEN_TYPE_VALUES = Object.values(GoogleTokenType);
