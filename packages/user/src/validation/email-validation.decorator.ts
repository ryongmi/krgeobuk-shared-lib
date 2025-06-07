import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail, MaxLength } from 'class-validator';

// Email 유효성 검사
export function IsValidEmail(isOptional = false): PropertyDecorator {
  const decorators = [
    ApiProperty({ example: 'auth@naver.com', description: '사용자 이메일' }),
    IsEmail({}, { message: '유효한 이메일 형식이 아닙니다' }), // 이메일 형식 검증
    MaxLength(255, { message: 'Email address is too long' }), // 최대 길이 제한
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: '이메일은 필수입니다' }), ...decorators);
}
