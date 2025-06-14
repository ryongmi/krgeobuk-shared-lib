import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidOptions } from '@krgeobuk/core/src/interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsDate } from 'class-validator';

// createdAt 유효성 검사
export function IsValidCreatedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const propertyData = { type: String, format: 'date-time', description: '생성된 날짜' };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const decorators = [apiDecorator, IsDate()];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: 'CreatedAt는 필수입니다' }), ...decorators);
}
