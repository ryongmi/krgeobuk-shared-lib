import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import type { IsValidNestedOptions, ExposeNestedOptions } from '../../../interfaces/index.js';

/**
 * 중첩 객체 유효성 검사 데코레이터
 * @param typeFn - 대상 DTO 클래스 생성자 함수
 * @param description - Swagger용 설명
 * @param nestedOptions - optional, message 설정
 */
export function IsValidNested<T>(nestedOptions: IsValidNestedOptions<T> = {}): PropertyDecorator {
  const { type, typeFn, description = '', options = {} } = nestedOptions;
  const { isOptional = false, message, isArray = false } = options;

  const propertyData = {
    type: isArray ? [type] : type,
    description,
    isArray,
  };

  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [ValidateNested(), Type(typeFn)];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: message ?? `${description}는 필수입니다` });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNested<T>(nestedOptions: ExposeNestedOptions<T> = {}): PropertyDecorator {
  const { type, typeFn, description = '', options = {} } = nestedOptions;
  const { isArray = false } = options;
  const propertyData = {
    type: isArray ? [type] : type,
    description,
    isArray,
  };

  return applyDecorators(ApiProperty(propertyData), Type(typeFn), Expose());
}
