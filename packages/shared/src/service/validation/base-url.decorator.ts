import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// 서비스 Base URL 유효성 검사
export function IsValidBaseUrl(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    type: String,
    example: 'https://service.krgeobuk.com',
    description: '서비스 Base URL',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsUrl(
      { protocols: ['https'] }, // HTTPS URL만 허용
      { message: 'Service Base URL must be a valid HTTPS URL' }
    ),
    MaxLength(2048, { message: 'Service Base URL is too long' }), // URL 길이 제한,
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '서비스 Base URL은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeBaseUrl(): PropertyDecorator {
  const propertyData = {
    type: String,
    example: 'https://service.krgeobuk.com',
    description: '서비스 Base URL',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
