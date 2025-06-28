export enum LimitType {
  FIFTEEN = 15,
  THIRTY = 30,
  FIFTY = 50,
  HUNDRED = 100,
}

// 배열이 필요할 때 사용하도록 따로 export
export const LIMIT_TYPE_VALUES = Object.values(LimitType);
