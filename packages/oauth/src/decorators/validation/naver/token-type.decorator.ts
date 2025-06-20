import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { IsString, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import type { IsValidAllowedOptions, ExposeAllowedOptions } from '@krgeobuk/core/interfaces';
import { NAVER_TOKEN_TYPE_VALUES } from '@krgeobuk/oauth/src/enum';

// Naver OAuth Token Type 유효성 검사
export function IsValidNaverTokenType(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedTokenTypes = NAVER_TOKEN_TYPE_VALUES } = options;

  const propertyData = {
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
    Expose({ name: 'tokenType' }),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Token Type는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNaverTokenType(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedTokenTypes = NAVER_TOKEN_TYPE_VALUES } = options;

  const propertyData = {
    example: allowedTokenTypes[0],
    description: `Naver OAuth Token Type. 허용값: ${allowedTokenTypes.join(', ')}`,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
