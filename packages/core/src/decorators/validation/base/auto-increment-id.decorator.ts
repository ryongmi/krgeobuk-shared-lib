import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidOptions } from '@krgeobuk/core/src/interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

// Auto Increment Id 유효성 검사
export function IsValidAutoIncrementId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const decorators = [ApiProperty({ example: 5, description: 'Auto Increment' }), IsNumber()];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'id는 필수입니다' }), ...decorators);
}
