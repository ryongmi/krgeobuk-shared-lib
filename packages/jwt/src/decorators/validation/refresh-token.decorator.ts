import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { type IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// Refresh Token 유효성 검사
export function IsValidRefreshToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Refresh Token',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString(), Expose({ name: 'refreshToken' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Refresh Token은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeRefreshToken(): PropertyDecorator {
  const propertyData = {
    example: 'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    description: 'Refresh Token',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
