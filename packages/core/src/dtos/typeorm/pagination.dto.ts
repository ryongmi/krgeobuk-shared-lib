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
import type {
  PaginateBaseOptions,
  PaginatedResult,
  PaginatedResultBase,
} from '../../interfaces/index.js';
import { SortOrderType } from '../../enum/index.js';

export abstract class PaginateBaseDto implements PaginateBaseOptions {
  @IsValidPage({ isOptional: true })
  page?: number;

  @IsValidLimit({ isOptional: true })
  limit?: number;

  @IsValidSortOrder({ isOptional: true })
  sortOrder?: SortOrderType;

  @IsValidSortBy({ isOptional: true })
  sortBy?: string;

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
  limit!: number;

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
