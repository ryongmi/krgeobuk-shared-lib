import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, MaxLength, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 오류 메시지 유효성 검사
export function IsValidErrorMessage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '에러메시지', description: '오류 메시지' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString(), MaxLength(255, { message: '오류 메시지는 최대 255자 입니다' })];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '오류 메시지는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeErrorMessage(): PropertyDecorator {
  const propertyData = { example: '에러메시지', description: '오류 메시지' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
