import { SortOrderType } from '../../enum/index.js';

export interface PaginateBaseOptions {
  page?: number;
  limit?: number;
  sortOrder?: SortOrderType;
  sortBy?: string;
  // 추가 옵션들
}

export interface PaginateWithFilterOptions<T> extends PaginateBaseOptions {
  filter?: Partial<T>;
  // 추가 옵션들
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
