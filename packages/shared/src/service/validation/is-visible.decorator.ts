import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 포탈 표시 여부 유효성 검사
export function IsValidIsVisible(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    type: Boolean,
    example: true,
    description: '포탈 표시 여부',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsBoolean()];
  const transformers = [
    Transform(({ value }) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      if (value === true || value === false) return value;
      return value;  // 그대로 반환하여 IsBoolean() 검증에서 실패하게 함
    })
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '포탈 표시 여부는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...transformers, ...validators, ...exposeDators);
}

export function ExposeIsVisible(): PropertyDecorator {
  const propertyData = {
    type: Boolean,
    example: true,
    description: '포탈 표시 여부',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
