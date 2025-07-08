import {
  IsValidPage,
  IsValidLimit,
  IsValidSortOrder,
  IsValidSortBy,
  ExposePage,
  ExposeLimit,
  ExposeTotal,
  ExposeTotalPaages,
  ExposeItems,
  ExposeHasPreviousPage,
  ExposeHasNextPage,
  ExposePageInfo,
} from '../../decorators/index.js';
import { LimitType, SortOrderType, SortByBaseType } from '../../enum/index.js';
import type {
  PaginateBaseOptions,
  PaginatedResult,
  PaginatedResultBase,
} from '../../interfaces/index.js';

export abstract class PaginateBaseDto implements PaginateBaseOptions {
  @IsValidPage({ isOptional: true })
  page?: number = 1;

  @IsValidLimit({ isOptional: true })
  limit?: LimitType = LimitType.THIRTY;

  @IsValidSortOrder({ isOptional: true })
  sortOrder?: SortOrderType = SortOrderType.DESC;

  @IsValidSortBy({ isOptional: true })
  sortBy?: string = SortByBaseType.CREATED_AT;

  // @IsOptional()
  // @Transform(({ value }) => value.split(','))
  // sortBy?: string[];

  // @IsOptional()
  // @Transform(({ value }) => value.split(','))
  // sortOrder?: ('ASC' | 'DESC')[];
}

export abstract class PaginateResultBaseDto implements PaginatedResultBase {
  @ExposePage()
  page!: number;

  @ExposeLimit()
  limit!: LimitType;

  @ExposeTotal()
  totalItems!: number;

  @ExposeTotalPaages()
  totalPages!: number;

  @ExposeHasPreviousPage()
  hasPreviousPage!: boolean;

  @ExposeHasNextPage()
  hasNextPage!: boolean;
}

export abstract class PaginateResultDto<T> implements PaginatedResult<T> {
  @ExposeItems()
  items!: T[];

  @ExposePageInfo()
  pageInfo!: PaginateResultBaseDto;

  // "meta": {
  //   "page": 1,
  //   "limit": 10,
  //   "totalItems": 100,
  //   "totalPages": 10,
  //   "hasNextPage": true,
  //   "sort": "name_asc",
  //   "appliedFilters": {
  //     "category": "book",
  //     "priceRange": [0, 10000]
  //   },
  //   "queryTime": "32ms",
  //   "timestamp": "2025-07-08T15:30:00Z"
  // }
}

