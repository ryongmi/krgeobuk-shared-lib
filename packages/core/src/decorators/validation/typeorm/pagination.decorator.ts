import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidOptions, IsValidAllowedOptions } from '@krgeobuk/core/src/interfaces';
import { SORT_ORDER_TYPE_VALUES } from '@krgeobuk/core/src/enum';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min, IsInt, IsIn, IsString } from 'class-validator';

// Page 유효성 검사
export function IsValidPage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const propertyData = {
    example: 5,
    description: '전체조회시 페이징용 시작페이지수',
    type: Number,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const decorators = [apiDecorator, IsInt(), Min(1), Type(() => Number)];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'page는 필수입니다' }), ...decorators);
}

// Limit 유효성 검사
export function IsValidLimit(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const propertyData = {
    example: 30,
    description: '전체조회시 페이징용 로우수 넘버',
    type: Number,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const decorators = [apiDecorator, IsInt(), Min(1), Type(() => Number)];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Limit는 필수입니다' }), ...decorators);
}

// SortOrder 유효성 검사
export function IsValidSortOrder(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const {
    isOptional = false,
    isExpose = false,
    allowed: allowedSortOrders = SORT_ORDER_TYPE_VALUES,
  } = options;

  const propertyData = {
    example: allowedSortOrders[0],
    description: `전체조회시 정렬 오름차순 / 내림차순. 허용값: ${allowedSortOrders.join(', ')}`,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const decorators = [
    apiDecorator,
    IsIn(allowedSortOrders, {
      message: `SortOrder는 다음 값 중 하나여야 합니다: ${allowedSortOrders.join(', ')}`,
    }),
  ];

  if (isExpose) {
    // sort-order 쿼리 → sortOrder 프로퍼티에 매핑
    decorators.push(Expose({ name: 'sort-order' }));
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'SortOrder는 필수입니다' }), ...decorators);
}

// SortBy 유효성 검사
export function IsValidSortBy(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const propertyData = {
    example: 'createdAt',
    description: '전체조회시 정렬기준',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const decorators = [apiDecorator, IsString()];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'SortBy는 필수입니다' }), ...decorators);
}
