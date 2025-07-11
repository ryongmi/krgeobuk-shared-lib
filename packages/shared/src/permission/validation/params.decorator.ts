import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Params 권한 ID 유효성 검사
export function IsValidPermissionIdParams(_options: IsValidOptions = {}): PropertyDecorator {
  const propertyData = {
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: '권한 ID',
    type: String,
    format: 'uuid',
  };

  const apiDecorator = SwaggerApiProperty(propertyData);
  const validators = [IsUUID(4, { message: '올바른 권한 ID 형식이 아닙니다' })];
  const exposeDators = [Expose()];
  const optionality = IsNotEmpty({ message: '권한 ID는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}
