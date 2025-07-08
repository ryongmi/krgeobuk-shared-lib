import type { LimitType, SortOrderType } from '../../enum/index.js';

export interface PaginateBaseOptions {
  page?: number;
  limit?: LimitType;
  sortOrder?: SortOrderType;
  sortBy?: string;
  // 추가 옵션들
}

export interface PaginateWithFilterOptions<T> extends PaginateBaseOptions {
  filter?: Partial<T>;
  // 추가 옵션들
}

export interface PaginatedResultBase {
  page: number;
  limit: LimitType;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageInfoWrapper {
  pageInfo: PaginatedResultBase;
}

export interface PaginatedResult<T> {
  items: T[];
  pageInfo: PaginatedResultBase;
}

