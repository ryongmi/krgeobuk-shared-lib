import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth User Name 유효성 검사
export function IsValidNaverUsername(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '오픈 API', description: 'Naver OAuth User Name' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MinLength(2, { message: 'Naver OAuth User Name은 최소 2자 이상이어야 합니다' }),
    Length(2, 30),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth User Name은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverUsername(): PropertyDecorator {
  const propertyData = { example: '오픈 API', description: 'Naver OAuth User Name' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
