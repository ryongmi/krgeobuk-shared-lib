import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidOptions } from '@krgeobuk/core/src/interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsDate } from 'class-validator';

// updatedAt 유효성 검사
export function IsValidUpdatedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const decorators = [
    ApiProperty({ type: String, format: 'date-time', required: !isOptional }),
    IsDate(),
  ];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'UpdatedAt는 필수입니다' }), ...decorators);
}
