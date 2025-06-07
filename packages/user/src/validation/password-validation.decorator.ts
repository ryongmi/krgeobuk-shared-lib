import { applyDecorators } from '@nestjs/common';
import { SwaagerApiProperty } from '@krgeobuk/swagger/decorators';
import { IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';

// 비밀번호 유효성 검사
export function IsValidPassword(isOptional = false): PropertyDecorator {
  const decorators = [
    SwaagerApiProperty({ example: 'P@ssw0rd!', description: '사용자 비밀번호' }),
    MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: '비밀번호는 최소 하나의 대문자, 소문자, 숫자나 특수문자를 포함해야 합니다',
    }),
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: '비밀번호는 필수입니다' }), ...decorators);
}
