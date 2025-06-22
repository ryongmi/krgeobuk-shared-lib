import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import { IsString, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { NAVER_GENDER_TYPE_KEYS } from '../../../../enum';
import type { IsValidAllowedOptions, ExposeAllowedOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth User Gender 유효성 검사
export function IsValidNaverGender(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedNaverGenders = NAVER_GENDER_TYPE_KEYS } = options;

  const propertyData = {
    example: allowedNaverGenders[0],
    description: `Naver OAuth User Gender. 허용값: ${allowedNaverGenders.join(', ')}`,
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    IsIn(allowedNaverGenders, {
      message: `Naver OAuth User Gender는 다음 값 중 하나여야 합니다: ${allowedNaverGenders.join(', ')}`,
    }),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth User Gender는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNaverGender(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedNaverGenders = NAVER_GENDER_TYPE_KEYS } = options;

  const propertyData = {
    example: allowedNaverGenders[0],
    description: `Naver OAuth User Gender. 허용값: ${allowedNaverGenders.join(', ')}`,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
