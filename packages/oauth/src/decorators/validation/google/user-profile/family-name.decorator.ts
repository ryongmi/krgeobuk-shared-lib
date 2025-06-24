import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Google OAuth Family Name 유효성 검사
export function IsValidGoogleFamilyName(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 'Parecki', description: 'Google OAuth Family Name' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString(), Expose({ name: 'family_name' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Family Name은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeGoogleFamilyName(): PropertyDecorator {
  const propertyData = { example: 'Parecki', description: 'Google OAuth Family Name' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose({ name: 'family_name' }));
}
