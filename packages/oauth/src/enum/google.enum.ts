export const GoogleTokenType = {
  BEARER: 'Bearer',
} as const;

export type GoogleTokenType = (typeof GoogleTokenType)[keyof typeof GoogleTokenType];

export const GOOGLE_TOKEN_TYPE_KEYS = Object.keys(GoogleTokenType) as GoogleTokenType[];
export const GOOGLE_TOKEN_TYPE_VALUES = Object.values(GoogleTokenType) as GoogleTokenType[];
