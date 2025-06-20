import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidOptions } from '@krgeobuk/core/src/interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// message 유효성 검사
export function IsValidMessage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '서버에서 에러가 발생하였습니다.',
    description: '에러발생시 해당 에러관련 메세지',
    type: String,
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsString()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Message는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeMessage(): PropertyDecorator {
  const propertyData = {
    example: '서버에서 에러가 발생하였습니다.',
    description: '에러발생시 해당 에러관련 메세지',
    type: String,
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
