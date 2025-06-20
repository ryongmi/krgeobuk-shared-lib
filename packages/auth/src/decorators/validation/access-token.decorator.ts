import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { type IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

// accessToken 유효성 검사
export function IsValidAccessToken(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: '홍길동', description: '사용자 이름' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [IsString()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Access Token은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeAccessToken(): PropertyDecorator {
  const propertyData = { example: '홍길동', description: '사용자 이름' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
