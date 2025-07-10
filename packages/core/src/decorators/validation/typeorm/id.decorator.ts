import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';

import type { IsValidOptions } from '../../../interfaces/index.js';

// Auto Increment Id 유효성 검사
export function IsValidAutoIncrementId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 5, description: 'Auto Increment', type: Number };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsNumber()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'id는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeAutoIncrementId(): PropertyDecorator {
  const propertyData = { example: 5, description: 'Auto Increment', type: Number };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// Uuid Id 유효성 검사
export function IsValidUuidId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2', description: 'UUID' };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsUUID('4', { message: 'id는 유효한 UUID여야 합니다.' })];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'id는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeUuidId(): PropertyDecorator {
  const propertyData = { example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2', description: 'UUID' };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

