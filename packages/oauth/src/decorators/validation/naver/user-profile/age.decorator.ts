import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Naver OAuth User Age 유효성 검사
export function IsValidNaverAge(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '40-49', description: 'Naver OAuth User Age' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '나이는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNaverAge(): PropertyDecorator {
  const propertyData = { example: '40-49', description: 'Naver OAuth User Age' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
