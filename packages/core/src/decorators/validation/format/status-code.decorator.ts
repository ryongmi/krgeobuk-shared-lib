import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidOptions } from '../../../interfaces/index.js';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

// statusCode 유효성 검사
export function IsValidStatusCode(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 0, description: '해당 HTTP 코드', type: Number };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsNumber()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Status Code는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeStatusCode(): PropertyDecorator {
  const propertyData = { example: 0, description: '해당 HTTP 코드', type: Number };

  return applyDecorators(ApiProperty(propertyData), Expose({ name: 'status_code' }));
}
