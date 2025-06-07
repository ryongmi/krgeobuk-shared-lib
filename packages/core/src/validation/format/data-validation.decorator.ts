import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsObject } from 'class-validator';

// data 유효성 검사
export function IsValidData(isOptional = false): PropertyDecorator {
  const decorators = [ApiProperty({ type: Object }), IsObject()];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Data는 필수입니다' }), ...decorators);
}
