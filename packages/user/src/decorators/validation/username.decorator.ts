import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, MinLength, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

// 사용자 이름 유효성 검사
export function IsValidUsername(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '홍길동', description: '사용자 이름' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MinLength(3, { message: '사용자 이름은 최소 3자 이상이어야 합니다' }),
    Length(3, 30),
    // Matches(/^[a-zA-Z0-9_-]+$/, {
    //   message:
    //     '사용자 이름은 영문자, 숫자, 밑줄(_), 하이픈(-)만 포함할 수 있습니다',
    // }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: '사용자 이름은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeUsername(): PropertyDecorator {
  const propertyData = { example: '홍길동', description: '사용자 이름' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
