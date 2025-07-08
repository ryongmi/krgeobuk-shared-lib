import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, Length, Matches, IsString, IsOptional } from 'class-validator';
import { Transform, Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

export function IsValidPermissionAction(options: IsValidOptions = {}) {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'user:create',
    description: '권한 액션 (예: user:create, post:read)',
    type: String,
    maxLength: 100,
    pattern: '^[a-zA-Z][a-zA-Z0-9_:-]*$',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString({ message: '액션은 문자열이어야 합니다.' }),
    Length(1, 100, { message: '액션은 1-100자 사이여야 합니다.' }),
    Matches(/^[a-zA-Z][a-zA-Z0-9_:-]*$/, {
      message: '액션은 영문자로 시작하고 영문자, 숫자, _, :, - 만 포함할 수 있습니다.',
    }),
    Transform(({ value }) => value?.trim()),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '액션은 필수입니다.' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposePermissionAction() {
  const propertyData = {
    description: '권한 액션 (예: user:create, post:read)',
    example: 'user:create',
    type: String,
    maxLength: 100,
    pattern: '^[a-zA-Z][a-zA-Z0-9_:-]*$',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

