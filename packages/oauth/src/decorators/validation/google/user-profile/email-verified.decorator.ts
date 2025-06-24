import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

// Google OAuth Email Verified 유효성 검사
export function IsValidGoogleEmailVerified(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: true,
    description: 'Google OAuth Email Verified',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsBoolean(), Expose({ name: 'email_verified' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Email Verified는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeGoogleEmailVerified(): PropertyDecorator {
  const propertyData = {
    example: true,
    description: 'Google OAuth Email Verified',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose({ name: 'email_verified' }));
}
