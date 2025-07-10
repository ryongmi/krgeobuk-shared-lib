import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Google OAuth Given Name 유효성 검사
export function IsValidGoogleGivenName(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'given_name',
    type: String,
    example: 'Aaron',
    description: 'Google OAuth Given Name',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose({ name: 'given_name' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Given Name은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeGoogleGivenName(): PropertyDecorator {
  const propertyData = {
    name: 'given_name',
    type: String,
    example: 'Aaron',
    description: 'Google OAuth Given Name',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
