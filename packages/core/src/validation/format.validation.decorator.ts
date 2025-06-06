import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// accessToken 유효성 검사
export function IsValidStatusCode(isOptional = false) {
  const decorators = [
    ApiProperty({ example: 0, description: '해당 HTTP 코드', type: Number }),
    IsString(),
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Access Token은은 필수입니다' }), ...decorators);
}
