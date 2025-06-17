export interface PaginateWithFilterOptions<T> {
  page: number;
  limit: number;
  filter?: Partial<T>;
  // 추가 옵션들
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
