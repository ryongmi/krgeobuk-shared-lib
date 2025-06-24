import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { IsString, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { GOOGLE_TOKEN_TYPE_VALUES } from '../../../../enum/index.js';
import type { IsValidAllowedOptions, ExposeAllowedOptions } from '@krgeobuk/core/interfaces';

// Google OAuth Token Type 유효성 검사
export function IsValidGoogleTokenType(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedTokenTypes = GOOGLE_TOKEN_TYPE_VALUES } = options;

  const propertyData = {
    example: allowedTokenTypes[0],
    description: `Google OAuth Token Type. 허용값: ${allowedTokenTypes.join(', ')}`,
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    IsIn(allowedTokenTypes, {
      message: `Google OAuth Token Type는 다음 값 중 하나여야 합니다: ${allowedTokenTypes.join(', ')}`,
    }),
    Expose({ name: 'token_type' }),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Google OAuth Token Type는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeGoogleTokenType(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedTokenTypes = GOOGLE_TOKEN_TYPE_VALUES } = options;

  const propertyData = {
    example: allowedTokenTypes[0],
    description: `Google OAuth Token Type. 허용값: ${allowedTokenTypes.join(', ')}`,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose({ name: 'token_type' }));
}
