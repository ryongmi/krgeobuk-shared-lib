import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth User Nickname 유효성 검사
export function IsValidNaverNickname(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 'OpenAPI', description: 'Naver OAuth User Nickname' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다' }),
    Length(2, 20), // 닉네임 길이 제한 (최소 2자, 최대 20자),
    // Matches(/^[a-zA-Z0-9_-]+$/, {
    //   message:
    //     '사용자 이름은 영문자, 숫자, 밑줄(_), 하이픈(-)만 포함할 수 있습니다',
    // }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '닉네임은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverNickname(): PropertyDecorator {
  const propertyData = { example: 'OpenAPI', description: 'Naver OAuth User Nickname' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
