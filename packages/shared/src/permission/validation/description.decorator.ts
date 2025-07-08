import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MaxLength, IsString } from 'class-validator';
import { Transform, Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

export function IsValidPermissionDescription(options: IsValidOptions = {}) {
  const { isOptional = false } = options;

  const propertyData = {
    example: '사용자 생성 권한',
    description: '권한 설명',
    type: String,
    maxLength: 255,
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString({ message: '설명은 문자열이어야 합니다.' }),
    MaxLength(255, { message: '설명은 255자 이하여야 합니다.' }),
    Transform(({ value }) => value?.trim() || undefined),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '설명은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposePermissionDescription() {
  const propertyData = {
    description: '권한 설명',
    example: '사용자 생성 권한',
    type: String,
    maxLength: 255,
    required: false,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

