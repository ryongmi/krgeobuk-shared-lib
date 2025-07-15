import { applyDecorators } from '@nestjs/common';

import { Expose } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';

export function ExposeVisibleRoleCount(): PropertyDecorator {
  const propertyData = {
    type: Number,
    example: 5,
    description: '접근 가능한 권한 수',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
