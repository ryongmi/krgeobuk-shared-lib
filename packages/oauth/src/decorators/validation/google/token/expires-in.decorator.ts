import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

// Google OAuth Token ExpiresIn 유효성 검사
export function IsValidGoogleExpiresIn(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '3600',
    description: 'Google OAuth Token ExpiresIn',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    Transform(({ value }) => Number(value)),
    IsNumber(),
    Min(1),
    Expose({ name: 'expiresIn' }),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Token ExpiresIn는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeGoogleExpiresIn(): PropertyDecorator {
  const propertyData = {
    example: '3600',
    description: 'Google OAuth Token ExpiresIn',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
