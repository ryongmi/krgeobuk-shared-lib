import { applyDecorators } from '@nestjs/common';

import { Expose } from 'class-transformer';

import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';

export function ExposeRedirectUrl(): PropertyDecorator {
  const propertyData = {
    example: 'http://localhost.com',
    description: '리다이렉트 시킬 서비스 url',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

