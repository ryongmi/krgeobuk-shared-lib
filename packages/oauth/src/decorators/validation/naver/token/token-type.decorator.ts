import { applyDecorators } from '@nestjs/common';
import { IsString, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidAllowedOptions, ExposeAllowedOptions } from '@krgeobuk/core/interfaces';

import { NAVER_TOKEN_TYPE_VALUES } from '../../../../enum/index.js';

// Naver OAuth Token Type 유효성 검사
export function IsValidNaverTokenType(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedTokenTypes = NAVER_TOKEN_TYPE_VALUES } = options;

  const propertyData = {
    name: 'token_type',
    example: allowedTokenTypes[0],
    description: `Naver OAuth Token Type. 허용값: ${allowedTokenTypes.join(', ')}`,
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    IsIn(allowedTokenTypes, {
      message: `Naver OAuth Token Type는 다음 값 중 하나여야 합니다: ${allowedTokenTypes.join(', ')}`,
    }),
  ];
  const exposeDators = [Expose({ name: 'token_type' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Token Type는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverTokenType(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedTokenTypes = NAVER_TOKEN_TYPE_VALUES } = options;

  const propertyData = {
    name: 'token_type',
    example: allowedTokenTypes[0],
    description: `Naver OAuth Token Type. 허용값: ${allowedTokenTypes.join(', ')}`,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
