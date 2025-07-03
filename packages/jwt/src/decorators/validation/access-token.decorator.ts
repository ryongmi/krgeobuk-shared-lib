import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { type IsValidOptions } from '@krgeobuk/core/interfaces';

// accessToken 유효성 검사
export function IsValidAccessToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'access_token',
    type: String,
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Access Token',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose({ name: 'access_token' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Access Token은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeAccessToken(): PropertyDecorator {
  const propertyData = {
    name: 'access_token',
    type: String,
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Access Token',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
