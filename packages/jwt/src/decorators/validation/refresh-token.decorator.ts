import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { type IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Refresh Token 유효성 검사
export function IsValidRefreshToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'refresh_token',
    type: String,
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Refresh Token',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const exposeDators = [Expose({ name: 'refresh_token' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Refresh Token은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeRefreshToken(): PropertyDecorator {
  const propertyData = {
    name: 'refresh_token',
    type: String,
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Refresh Token',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
