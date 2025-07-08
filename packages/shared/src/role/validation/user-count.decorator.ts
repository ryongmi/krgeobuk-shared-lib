import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';

export function ExposeUserCount(): PropertyDecorator {
  const propertyData = {
    name: 'user_count',
    type: Number,
    example: 5,
    description: '해당 역활 사용하는 유저 수',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

