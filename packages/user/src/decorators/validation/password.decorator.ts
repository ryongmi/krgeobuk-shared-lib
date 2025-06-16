import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

// 비밀번호 유효성 검사
export function IsValidPassword(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const propertyData = { example: 'P@ssw0rd!', description: '사용자 비밀번호' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const decorators = [
    apiDecorator,
    MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: '비밀번호는 최소 하나의 대문자, 소문자, 숫자나 특수문자를 포함해야 합니다',
    }),
  ];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: '비밀번호는 필수입니다' }), ...decorators);
}
