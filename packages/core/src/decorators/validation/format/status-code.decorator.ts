import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

import type { IsValidOptions } from '../../../interfaces/index.js';

// statusCode 유효성 검사
export function IsValidStatusCode(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'status_code',
    example: 0,
    description: '해당 HTTP 코드',
    type: Number,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsNumber()];
  const exposeDators = [Expose({ name: 'status_code' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Status Code는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeStatusCode(): PropertyDecorator {
  const propertyData = {
    name: 'status_code',
    example: 0,
    description: '해당 HTTP 코드',
    type: Number,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
