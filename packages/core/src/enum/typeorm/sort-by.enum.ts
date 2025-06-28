export const SortByBaseType = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  DELETED_AT: 'deletedAt',
} as const;

export type SortByBaseType = (typeof SortByBaseType)[keyof typeof SortByBaseType];

export const SORT_BY_BASE_TYPE_VALUES = Object.values(SortByBaseType);
