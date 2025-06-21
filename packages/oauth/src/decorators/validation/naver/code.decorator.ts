import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Naver OAuth code 유효성 검사
export function IsValidNaverCode(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Naver OAuth Callback code',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Callback code는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNaverCode(): PropertyDecorator {
  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Naver OAuth Callback code',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
