import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Oauth 통합 여부 유효성 검사
export function IsValidIsIntegrated(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'is_integrated',
    type: Boolean,
    example: false,
    description: 'OAuth 통합 여부',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsBoolean()];
  const exposeDators = [Expose({ name: 'is_integrated' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'OAuth 통합 여부는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeIsIntegrated(): PropertyDecorator {
  const propertyData = {
    name: 'is_integrated',
    type: Boolean,
    example: false,
    description: 'OAuth 통합 여부',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
