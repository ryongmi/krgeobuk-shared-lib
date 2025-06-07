import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

// statusCode 유효성 검사
export function IsValidStatusCode(isOptional = false): PropertyDecorator {
  const decorators = [
    ApiProperty({ example: 0, description: '해당 HTTP 코드', type: Number }),
    IsNumber(),
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Status Code는 필수입니다' }), ...decorators);
}
