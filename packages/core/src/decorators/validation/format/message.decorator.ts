import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// message 유효성 검사
export function IsValidMessage(isOptional = false): PropertyDecorator {
  const decorators = [
    ApiProperty({
      example: '서버에서 에러가 발생하였습니다.',
      description: '에러발생시 해당 에러관련 메세지',
      type: String,
    }),
    IsString(),
  ];

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'Message는 필수입니다' }), ...decorators);
}
