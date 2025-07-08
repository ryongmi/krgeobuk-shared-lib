import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';

export function ExposeRoleCount(): PropertyDecorator {
  const propertyData = {
    name: 'role_count',
    type: Number,
    example: 5,
    description: '해당 권한 사용하는 역활 수',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

