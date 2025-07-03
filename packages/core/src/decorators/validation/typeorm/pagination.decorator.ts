import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min, IsInt, IsIn, IsString } from 'class-validator';

import { SORT_ORDER_TYPE_VALUES, LIMIT_TYPE_VALUES } from '../../../enum/index.js';
import type {
  IsValidOptions,
  IsValidAllowedOptions,
  ExposeAllowedOptions,
} from '../../../interfaces/index.js';

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
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'page는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
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
export function IsValidLimit(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedLimits = LIMIT_TYPE_VALUES } = options;

  const propertyData = {
    example: allowedLimits[0],
    description: `전체조회시 페이징용 로우수 넘버. 허용값: ${allowedLimits.join(', ')}`,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const exposeDators = [Expose()];
  const validators = [
    Transform(({ value }) => Number(value)),
    IsIn(allowedLimits, {
      message: `Limit는 다음 값 중 하나여야 합니다: ${allowedLimits.join(', ')}`,
    }),
  ];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Limit는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeLimit(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedLimits = LIMIT_TYPE_VALUES } = options;
  const propertyData = {
    example: allowedLimits[0],
    description: `전체조회시 페이징용 로우수 넘버. 허용값: ${allowedLimits.join(', ')}`,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// SortOrder 유효성 검사
export function IsValidSortOrder(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedSortOrders = SORT_ORDER_TYPE_VALUES } = options;

  const propertyData = {
    name: 'sort_order',
    example: allowedSortOrders[0],
    description: `전체조회시 정렬 오름차순 / 내림차순. 허용값: ${allowedSortOrders.join(', ')}`,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const exposeDators = [Expose({ name: 'sort_order' })];
  const validators = [
    IsIn(allowedSortOrders, {
      message: `SortOrder는 다음 값 중 하나여야 합니다: ${allowedSortOrders.join(', ')}`,
    }),
  ];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'SortOrder는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeSortOrder(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedSortOrders = SORT_ORDER_TYPE_VALUES } = options;
  const propertyData = {
    name: 'sort_order',
    example: allowedSortOrders[0],
    description: `전체조회시 정렬 오름차순 / 내림차순. 허용값: ${allowedSortOrders.join(', ')}`,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// SortBy 유효성 검사
export function IsValidSortBy(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'sort_by',
    example: 'createdAt',
    description: '전체조회시 정렬기준',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose({ name: 'sort_by' })];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'SortBy는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeSortBy(): PropertyDecorator {
  const propertyData = {
    name: 'sort_by',
    example: 'createdAt',
    description: '전체조회시 정렬기준',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

export function ExposeTotal(): PropertyDecorator {
  const propertyData = {
    example: 623,
    description: '전체조회시 데이터 총 개수',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

export function ExposeTotalPaages(): PropertyDecorator {
  const propertyData = {
    name: 'total_pages',
    example: 100,
    description: '전체조회시 총 페이지 수',
    type: Number,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

export function ExposeItems(): PropertyDecorator {
  const propertyData = {
    type: Array,
    description: '응답 데이터 목록',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
