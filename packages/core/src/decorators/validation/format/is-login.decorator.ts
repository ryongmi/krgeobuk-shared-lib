import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

import type { IsValidOptions } from '../../../interfaces/index.js';

// isLogin 유효성 검사
export function IsValidIsLogin(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: false,
    description: '로그인 유무',
    type: Boolean,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsBoolean()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Is Login는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeIsLogin(): PropertyDecorator {
  const propertyData = {
    example: false,
    description: '로그인 유무',
    type: Boolean,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
