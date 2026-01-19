import { applyDecorators } from '@nestjs/common';

import { Expose } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';

export function ExposeRequestId(): PropertyDecorator {
  const propertyData = {
    example: 1,
    type: Number,
    description: '계정 병합 요청 ID',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
