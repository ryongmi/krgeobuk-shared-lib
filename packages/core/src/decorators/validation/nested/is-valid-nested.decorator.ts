import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidNestedOptions } from '@krgeobuk/core/src/interfaces';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

/**
 * 중첩 객체 유효성 검사 데코레이터
 * @param typeFn - 대상 DTO 클래스 생성자 함수
 * @param description - Swagger용 설명
 * @param nestedOptions - optional, expose, message 설정
 */
export function IsValidNested<T>(nestedOptions: IsValidNestedOptions<T> = {}): PropertyDecorator {
  const { typeFn, description = '', options = {} } = nestedOptions;
  const { isOptional = false, isExpose = false, message } = options;

  const propertyData = { type: typeFn, description };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const decorators = [apiDecorator, ValidateNested(), Type(typeFn)];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(
    IsNotEmpty({ message: message ?? `${description}는 필수입니다` }),
    ...decorators
  );
}
