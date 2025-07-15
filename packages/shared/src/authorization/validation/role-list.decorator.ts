import { applyDecorators } from '@nestjs/common';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 역할 목록 유효성 검사
export function IsValidRoleList(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: ['admin', 'user', 'moderator'],
    description: '역할 목록',
    type: [String],
  };

  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);

  const validators = [
    IsArray({ message: '역할 목록은 배열이어야 합니다' }),
    IsString({ each: true, message: '각 역할은 문자열이어야 합니다' }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '역할 목록은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeRoleList(): PropertyDecorator {
  const propertyData = {
    example: ['admin', 'user'],
    description: '역할 목록',
    type: [String],
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

