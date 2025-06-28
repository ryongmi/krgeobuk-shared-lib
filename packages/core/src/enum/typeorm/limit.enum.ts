export const LimitType = {
  FIFTEEN: 15,
  THIRTY: 30,
  FIFTY: 50,
  HUNDRED: 100,
} as const;

export type LimitType = (typeof LimitType)[keyof typeof LimitType];

export const LIMIT_TYPE_VALUES = Object.values(LimitType) as LimitType[];
