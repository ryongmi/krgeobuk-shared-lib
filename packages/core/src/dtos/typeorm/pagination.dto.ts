import { IsValidPage, IsValidLimit, IsValidSortOrder, IsValidSortBy } from '../../decorators';
import type { PaginateBaseOptions } from '../../interfaces';
import { SortOrderType } from '../../enum';

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
