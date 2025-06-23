import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type {
  IsValidOptions,
  IsValidAllowedOptions,
  ExposeAllowedOptions,
} from '../../../interfaces/index.js';
import { SORT_ORDER_TYPE_VALUES } from '../../../enum/index.js';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min, IsInt, IsIn, IsString } from 'class-validator';

// Page 유효성 검사
export function IsValidPage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 5,
    description: '전체조회시 페이징용 시작페이지수',
    type: Number,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [Transform(({ value }) => Number(value)), IsInt(), Min(1)];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'page는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposePage(): PropertyDecorator {
  const propertyData = {
    example: 5,
    description: '전체조회시 페이징용 시작페이지수',
    type: Number,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// Limit 유효성 검사
export function IsValidLimit(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 30,
    description: '전체조회시 페이징용 로우수 넘버',
    type: Number,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [Transform(({ value }) => Number(value)), IsInt(), Min(1)];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Limit는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeLimit(): PropertyDecorator {
  const propertyData = {
    example: 30,
    description: '전체조회시 페이징용 로우수 넘버',
    type: Number,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// SortOrder 유효성 검사
export function IsValidSortOrder(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedSortOrders = SORT_ORDER_TYPE_VALUES } = options;

  const propertyData = {
    example: allowedSortOrders[0],
    description: `전체조회시 정렬 오름차순 / 내림차순. 허용값: ${allowedSortOrders.join(', ')}`,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [
    IsIn(allowedSortOrders, {
      message: `SortOrder는 다음 값 중 하나여야 합니다: ${allowedSortOrders.join(', ')}`,
    }),
  ];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'SortOrder는 필수입니다' });

  return applyDecorators(
    apiDecorator,
    optionality,
    Expose({ name: 'sort-order' }), // sort-order 쿼리 → sortOrder 프로퍼티에 매핑
    ...validators
  );
}

export function ExposeSortOrder(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedSortOrders = SORT_ORDER_TYPE_VALUES } = options;
  const propertyData = {
    example: allowedSortOrders[0],
    description: `전체조회시 정렬 오름차순 / 내림차순. 허용값: ${allowedSortOrders.join(', ')}`,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// SortBy 유효성 검사
export function IsValidSortBy(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'createdAt',
    description: '전체조회시 정렬기준',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'SortBy는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeSortBy(): PropertyDecorator {
  const propertyData = {
    example: 'createdAt',
    description: '전체조회시 정렬기준',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
