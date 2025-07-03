import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 권한 등급 유효성 검사
export function IsValidPriority(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 2,
    description: '권한 등급 - 낮을수록 더 높은 권한 ( 최상위 1 )',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [Transform(({ value }) => Number(value)), IsInt(), Min(1), Max(9)];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '권한 등급은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposePriority(): PropertyDecorator {
  const propertyData = {
    example: 2,
    description: '권한 등급 - 낮을수록 더 높은 권한 ( 최상위 1 )',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
