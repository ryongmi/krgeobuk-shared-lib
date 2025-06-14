import { applyDecorators } from '@nestjs/common';
import { IsValidOptions } from '@krgeobuk/core/interfaces';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { IsNotEmpty, IsOptional, IsEmail, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Email 유효성 검사
export function IsValidEmail(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const propertyData = { example: 'auth@naver.com', description: '사용자 이메일' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const decorators = [
    apiDecorator,
    IsEmail({}, { message: '유효한 이메일 형식이 아닙니다' }), // 이메일 형식 검증
    MaxLength(255, { message: 'Email address is too long' }), // 최대 길이 제한
  ];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: '이메일은 필수입니다' }), ...decorators);
}
