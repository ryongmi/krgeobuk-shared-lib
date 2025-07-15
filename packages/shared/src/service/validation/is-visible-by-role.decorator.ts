import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 권한 기반 표시 여부 유효성 검사
export function IsValidIsVisibleByRole(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    type: Boolean,
    example: false,
    description: '권한 기반 표시 여부',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsBoolean()];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '권한 기반 표시 여부는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeIsVisibleByRole(): PropertyDecorator {
  const propertyData = {
    type: Boolean,
    example: false,
    description: '권한 기반 표시 여부',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
