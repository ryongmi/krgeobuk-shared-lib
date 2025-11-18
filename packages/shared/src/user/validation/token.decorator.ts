import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

/**
 * 범용 인증 토큰 유효성 검사 (UUID v4)
 */
export function IsValidToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: '인증 토큰 (UUID v4)',
    type: String,
    format: 'uuid',
  };

  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);

  const validators = [IsUUID(4, { message: '올바른 토큰 형식이 아닙니다' })];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '토큰은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

/**
 * 비밀번호 재설정 토큰 유효성 검사 (UUID v4)
 */
export function IsValidResetToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: '비밀번호 재설정 토큰 (UUID v4)',
    type: String,
    format: 'uuid',
  };

  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);

  const validators = [IsUUID(4, { message: '올바른 재설정 토큰 형식이 아닙니다' })];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '재설정 토큰은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

/**
 * 이메일 인증 토큰 유효성 검사 (UUID v4)
 */
export function IsValidEmailVerificationToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: '이메일 인증 토큰 (UUID v4)',
    type: String,
    format: 'uuid',
  };

  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);

  const validators = [IsUUID(4, { message: '올바른 인증 토큰 형식이 아닙니다' })];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '인증 토큰은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

/**
 * 토큰 Expose 데코레이터 (검증 없이 Swagger + Expose만)
 */
export function ExposeToken(): PropertyDecorator {
  const propertyData = {
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: '인증 토큰 (UUID v4)',
    type: String,
    format: 'uuid',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
