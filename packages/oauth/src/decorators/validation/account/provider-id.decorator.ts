import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Oauth 제공자 고유 ID 유효성 검사
export function IsValidProviderId(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Oauth 제공자 고유 ID',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MaxLength(255, { message: 'Provider ID는 최대 255자 입니다' }),
    Expose({ name: 'provider_id' }),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Provider ID는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeProviderId(): PropertyDecorator {
  const propertyData = {
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: 'Oauth 제공자 고유 ID',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose({ name: 'provider_id' }));
}
