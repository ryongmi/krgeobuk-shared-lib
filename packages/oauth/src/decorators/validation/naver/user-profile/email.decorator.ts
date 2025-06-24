import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { IsNaverEmail } from '@krgeobuk/core/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsEmail, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Naver OAuth Email 유효성 검사
export function IsValidNaverEmail(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 'openapi@naver.com', description: 'Naver OAuth User Email' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsEmail({}, { message: '유효한 이메일 형식이 아닙니다' }), // 이메일 형식 검증
    IsNaverEmail(), // 네이버 이메일 도메인 검증
    MaxLength(255, { message: 'Email address is too long' }), // 최대 길이 제한
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '이메일은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverEmail(): PropertyDecorator {
  const propertyData = { example: 'openapi@naver.com', description: 'Naver OAuth User Email' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
