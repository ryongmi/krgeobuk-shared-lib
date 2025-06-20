import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsEmail, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Email 유효성 검사
export function IsValidEmail(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 'auth@naver.com', description: '사용자 이메일' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsEmail({}, { message: '유효한 이메일 형식이 아닙니다' }), // 이메일 형식 검증
    MaxLength(255, { message: 'Email address is too long' }), // 최대 길이 제한
  ];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '이메일은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeEmail(): PropertyDecorator {
  const propertyData = { example: 'auth@naver.com', description: '사용자 이메일' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
