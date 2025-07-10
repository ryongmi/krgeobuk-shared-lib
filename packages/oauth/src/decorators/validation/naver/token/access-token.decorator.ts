import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth Access Token 유효성 검사
export function IsValidNaverAccessToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'access_token',
    type: String,
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Naver OAuth Access Token',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose({ name: 'access_token' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Access Token은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverAccessToken(): PropertyDecorator {
  const propertyData = {
    name: 'access_token',
    type: String,
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Naver OAuth Access Token',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
