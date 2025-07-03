import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 권한명 유효성 검사
export function IsValidRoleName(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '테스트 권한', description: '권한명' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MinLength(2, { message: '권한명은 최소 2자 이상이어야 합니다' }),
    Length(2, 50),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '권한명은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeRoleName(): PropertyDecorator {
  const propertyData = { example: '테스트 권한', description: '권한명' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
