import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidOptions } from '@krgeobuk/core/src/interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

// Uuid Id 유효성 검사
export function IsValidUuidId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const decorators = [
    ApiProperty({ example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2', description: 'UUID' }),
    IsUUID(),
  ];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'id는 필수입니다' }), ...decorators);
}
