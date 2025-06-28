export const SortOrderType = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type SortOrderType = (typeof SortOrderType)[keyof typeof SortOrderType];

export const SORT_ORDER_TYPE_VALUES = Object.values(SortOrderType);
