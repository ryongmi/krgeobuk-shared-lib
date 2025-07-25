import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import type { IsValidOptions } from '../../../interfaces/index.js';

// error 유효성 검사
export function IsValidError(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'Bad Request',
    description: '에러발생시 해당 에러종류',
    type: String,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Error는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeError(): PropertyDecorator {
  const propertyData = {
    example: 'Bad Request',
    description: '에러발생시 해당 에러종류',
    type: String,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
