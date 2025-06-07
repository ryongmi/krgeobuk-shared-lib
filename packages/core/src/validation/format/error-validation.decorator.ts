import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// error 유효성 검사
export function IsValidError(isOptional = false): PropertyDecorator {
  const decorators = [
    ApiProperty({
      example: 'Bad Request',
      description: '에러발생시 해당 에러종류',
      type: String,
    }),
    IsString(),
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Error는 필수입니다' }), ...decorators);
}
