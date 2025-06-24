import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';

// 이메일 검증 유무 유효성 검사
export function IsValidIsEmailVerified(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: false,
    description: '이메일 검증 여부',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsBoolean(), Expose({ name: 'is_email_verified' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '이메일 검증유무는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeEmailVerified(): PropertyDecorator {
  const propertyData = {
    example: false,
    description: '이메일 검증 여부',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose({ name: 'is_email_verified' }));
}
