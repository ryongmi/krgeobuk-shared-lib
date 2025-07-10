import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsObject } from 'class-validator';

import type { IsValidOptions } from '../../../interfaces/index.js';

// data 유효성 검사
export function IsValidData(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { type: Object };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsObject()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Data는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeData(): PropertyDecorator {
  const propertyData = {
    type: Object,
    description: '응답 데이터',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
