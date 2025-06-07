import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

// isLogin 유효성 검사
export function IsValidIsLogin(isOptional = false): PropertyDecorator {
  const decorators = [
    ApiProperty({
      example: false,
      description: '로그인 유무',
      type: Boolean,
    }),
    IsBoolean(),
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Is Login는 필수입니다' }), ...decorators);
}
