import { applyDecorators } from '@nestjs/common';

import { Expose, Type } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';

export function ExposeExpiresAt(): PropertyDecorator {
  const propertyData = {
    example: new Date().toISOString(),
    type: String,
    format: 'date-time',
    description: '요청 만료 시각',
  };

  return applyDecorators(
    SwaggerApiProperty(propertyData),
    Type(() => Date),
    Expose()
  );
}
