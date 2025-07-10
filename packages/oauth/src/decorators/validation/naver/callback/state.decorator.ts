import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth state 유효성 검사
export function IsValidNaverState(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Naver OAuth Callback state',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Callback state는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverState(): PropertyDecorator {
  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Naver OAuth Callback state',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
