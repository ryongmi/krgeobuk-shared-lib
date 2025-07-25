import { applyDecorators } from '@nestjs/common';

import { IsString, MaxLength, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidAllowedOptions, ExposeAllowedOptions } from '@krgeobuk/core/interfaces';

import { OAUTH_ACCOUNT_PROVIDER_TYPE_VALUES } from '../enum/index.js';

// Oauth 제공자 도메인 유효성 검사
export function IsValidProvider(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedProviders = OAUTH_ACCOUNT_PROVIDER_TYPE_VALUES } =
    options;

  const propertyData = {
    example: allowedProviders[0],
    description: `OAuth 제공자 이름. 허용값: ${allowedProviders.join(', ')}`,
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MaxLength(50, { message: 'Provider는 최대 50자 입니다' }),
    IsIn(allowedProviders, {
      message: `Provider는 다음 값 중 하나여야 합니다: ${allowedProviders.join(', ')}`,
    }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Provider는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeProvider(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedProviders = OAUTH_ACCOUNT_PROVIDER_TYPE_VALUES } = options;

  const propertyData = {
    example: allowedProviders[0],
    description: `OAuth 제공자 이름. 허용값: ${allowedProviders.join(', ')}`,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
