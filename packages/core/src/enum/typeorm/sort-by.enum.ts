export enum SortByBaseType {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

// 배열이 필요할 때 사용하도록 따로 export
export const SORT_BY_BASE_TYPE_VALUES = Object.values(SortByBaseType);
