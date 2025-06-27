import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidOptions } from '../../../interfaces/index.js';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// success code 유효성 검사
export function IsValidSuccessCode(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'CORE_201',
    description: '요청처리 성공시 해당 응답관련 code',
    type: String,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'code는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeSuccessCode(): PropertyDecorator {
  const propertyData = {
    example: 'CORE_201',
    description: '요청처리 성공시 해당 응답관련 code',
    type: String,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// error code 유효성 검사
export function IsValidErrorCode(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'CORE_001',
    description: '에러발생시 해당 에러관련 code',
    type: String,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'code는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeErrorCode(): PropertyDecorator {
  const propertyData = {
    example: 'CORE_001',
    description: '에러발생시 해당 에러관련 code',
    type: String,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
