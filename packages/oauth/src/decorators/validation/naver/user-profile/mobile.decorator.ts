import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth User Mobile 유효성 검사
export function IsValidNaverMobile(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: '010-0000-0000',
    description: 'Naver OAuth User Mobile (형식: 010-0000-0000)',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    Matches(/^01[0|1|6-9]-\d{3,4}-\d{4}$/, {
      message: '유효한 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)',
    }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth User Mobile은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverMobile(): PropertyDecorator {
  const propertyData = {
    example: '1900',
    description: 'Naver OAuth User Mobile (형식: 010-0000-0000)',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
