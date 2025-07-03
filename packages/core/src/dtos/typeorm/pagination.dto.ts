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
  total!: number;

  @ExposeTotalPaages()
  totalPages!: number;
}

export abstract class PaginateResultDto<T>
  extends PaginateResultBaseDto
  implements PaginatedResult<T>
{
  @ExposeItems()
  items!: T[];
}
