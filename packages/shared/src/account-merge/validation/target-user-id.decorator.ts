import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 기존 사용자 ID 유효성 검사
export function IsValidTargetUserId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '기존 사용자 ID',
    type: String,
    format: 'uuid',
  };

  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);

  const validators = [IsUUID(4, { message: '올바른 기존 사용자 ID 형식이 아닙니다' })];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '기존 사용자 ID는 필수입니다' });
  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeRoleId(): PropertyDecorator {
  const propertyData = {
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '기존 사용자 ID',
    type: String,
    format: 'uuid',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
