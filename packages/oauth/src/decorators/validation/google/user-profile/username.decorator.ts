import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

// Google OAuth User Name 유효성 검사
export function IsValidGoogleUsername(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 'Aaron Parecki', description: 'Google OAuth User Name' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MinLength(2, { message: 'Google OAuth User Name은 최소 2자 이상이어야 합니다' }),
    Length(2, 30),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth User Name은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeGoogleUsername(): PropertyDecorator {
  const propertyData = { example: 'Aaron Parecki', description: 'Google OAuth User Name' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
