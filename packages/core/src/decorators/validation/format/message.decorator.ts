import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import type { IsValidOptions } from '../../../interfaces/index.js';

// success message 유효성 검사
export function IsValidSuccessMessage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '요청이 성공적으로 처리되었습니다.',
    description: '요청 처리 성공시 해당 응답관련 메세지',
    type: String,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Message는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeSuccessMessage(): PropertyDecorator {
  const propertyData = {
    example: '요청이 성공적으로 처리되었습니다.',
    description: '요청 처리 성공시 해당 응답관련 메세지',
    type: String,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// error message 유효성 검사
export function IsValidErrorMessage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '서버에서 에러가 발생하였습니다.',
    description: '에러발생시 해당 에러관련 메세지',
    type: String,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Message는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeErrorMessage(): PropertyDecorator {
  const propertyData = {
    example: '서버에서 에러가 발생하였습니다.',
    description: '에러발생시 해당 에러관련 메세지',
    type: String,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
