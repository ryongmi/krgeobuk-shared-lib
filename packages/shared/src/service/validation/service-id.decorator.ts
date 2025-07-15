import { applyDecorators } from '@nestjs/common';

import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

export function IsValidServiceId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '서비스 ID',
    type: String,
    format: 'uuid',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsUUID('4', { message: '서비스 ID는 유효한 UUID여야 합니다.' })];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '서비스 ID는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeServiceId(): PropertyDecorator {
  const propertyData = {
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '서비스 ID',
    type: String,
    format: 'uuid',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
