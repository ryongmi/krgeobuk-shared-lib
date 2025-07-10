import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, MaxLength, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 권한 설명 유효성 검사
export function IsValidDescription(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '관리자용 권한', description: '권한 설명' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString(), MaxLength(255, { message: '권한 설명은 최대 255자 입니다' })];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '권한 설명은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeDescription(): PropertyDecorator {
  const propertyData = { example: '관리자용 권한', description: '권한 설명' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
