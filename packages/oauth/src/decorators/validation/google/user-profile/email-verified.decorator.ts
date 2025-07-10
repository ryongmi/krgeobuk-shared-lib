import { applyDecorators } from '@nestjs/common';

import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Google OAuth Email Verified 유효성 검사
export function IsValidGoogleEmailVerified(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'verified_email',
    type: Boolean,
    example: true,
    description: 'Google OAuth Email Verified',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsBoolean()];
  const exposeDators = [Expose({ name: 'verified_email' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Email Verified는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeGoogleEmailVerified(): PropertyDecorator {
  const propertyData = {
    name: 'verified_email',
    type: Boolean,
    example: true,
    description: 'Google OAuth Email Verified',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
