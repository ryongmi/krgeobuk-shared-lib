import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Google OAuth Family Name 유효성 검사
export function IsValidGoogleFamilyName(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'family_name',
    type: String,
    example: 'Parecki',
    description: 'Google OAuth Family Name',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose({ name: 'family_name' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Family Name은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeGoogleFamilyName(): PropertyDecorator {
  const propertyData = {
    name: 'family_name',
    type: String,
    example: 'Parecki',
    description: 'Google OAuth Family Name',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
