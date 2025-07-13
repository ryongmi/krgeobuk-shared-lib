import { applyDecorators } from '@nestjs/common';

import { IsArray, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 권한 ID 목록 유효성 검사
export function IsValidPermissionIds(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002'],
    description: '권한 ID 목록',
    type: [String],
    name: 'permission_ids',
  };

  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);

  const validators = [
    IsArray({ message: '권한 ID 목록은 배열이어야 합니다' }),
    IsUUID(4, { each: true, message: '올바른 권한 ID 형식이 아닙니다' }),
  ];
  const exposeDators = [Expose({ name: 'permission_ids' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ each: true,message: '권한 ID 목록은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposePermissionIds(): PropertyDecorator {
  const propertyData = {
    example: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002'],
    description: '권한 ID 목록',
    type: [String],
    name: 'permission_ids',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

