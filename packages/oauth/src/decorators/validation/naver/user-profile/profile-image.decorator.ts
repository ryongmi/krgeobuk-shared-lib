import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// Naver OAuth User ProfileImage 유효성 검사
export function IsValidNaverProfileImage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    example: 'https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif',
    description: 'Naver OAuth User ProfileImage URL',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsUrl(
      { protocols: ['https'] }, // HTTPS URL만 허용
      { message: 'Profile image must be a valid HTTPS URL' }
    ),
    MaxLength(2048, { message: 'Profile image URL is too long' }), // URL 길이 제한,
    Expose({ name: 'profileImage' }),
  ];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth User ProfileImage URL은 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeNaverProfileImage(): PropertyDecorator {
  const propertyData = {
    example: 'https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif',
    description: 'Naver OAuth User ProfileImage URL',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
