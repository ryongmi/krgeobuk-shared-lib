import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Google OAuth Token ID 유효성 검사
export function IsValidGoogleTokenId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Google OAuth Token ID',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString(), Expose({ name: 'idToken' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Token ID는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeGoogleTokenId(): PropertyDecorator {
  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Google OAuth Token ID',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
