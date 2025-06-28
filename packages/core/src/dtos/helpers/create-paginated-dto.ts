import { Type } from '@nestjs/common';

import {
  ExposePage,
  ExposeLimit,
  ExposeTotal,
  ExposeTotalPaages,
  ExposeNested,
} from '../../decorators/index.js';

import { PaginatedResult } from '../../interfaces/typeorm/pagination.interface.js';

export function createPaginatedDto<T>(ItemDto: Type<T>): new () => PaginatedResult<T> {
  class PaginatedDto implements PaginatedResult<T> {
    @ExposePage()
    page!: number;

    @ExposeLimit()
    limit!: number;

    @ExposeTotal()
    total!: number;

    @ExposeTotalPaages()
    totalPages!: number;

    @ExposeNested<T>({
      typeFn: () => ItemDto,
      description: '응답 데이터 목록',
      options: { isArray: true },
    })
    data!: T[];
  }

  return PaginatedDto;
}
