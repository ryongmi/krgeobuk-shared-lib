import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 서비스 고유 이름 유효성 검사
export function IsValidServiceName(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '서비스 고유 이름', description: 'auth-server' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MinLength(2, { message: '서비스 고유 이름은 최소 2자 이상이어야 합니다' }),
    Length(2, 50),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '서비스 고유 이름은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeServiceName(): PropertyDecorator {
  const propertyData = { example: '서비스 고유 이름', description: 'auth-server' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
