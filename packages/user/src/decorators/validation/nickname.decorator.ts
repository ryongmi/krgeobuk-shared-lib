import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

// 사용자 닉네임 유효성 검사
export function IsValidNickname(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '동에번쩍', description: '사용자 별명' };
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
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '닉네임은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNickname(): PropertyDecorator {
  const propertyData = { example: '동에번쩍', description: '사용자 별명' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
