import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Naver OAuth Refresh Token 유효성 검사
export function IsValidNaverRefreshToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Naver OAuth Refresh Token',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString(), Expose({ name: 'refresh_token' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Refresh Token은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNaverRefreshToken(): PropertyDecorator {
  const propertyData = {
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Naver OAuth Refresh Token',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose({ name: 'refresh_token' }));
}
