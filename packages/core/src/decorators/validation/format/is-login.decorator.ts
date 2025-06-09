import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidOptions } from '@krgeobuk/core/src/interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

// isLogin 유효성 검사
export function IsValidIsLogin(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const decorators = [
    ApiProperty({
      example: false,
      description: '로그인 유무',
      type: Boolean,
    }),
    IsBoolean(),
  ];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Is Login는 필수입니다' }), ...decorators);
}
