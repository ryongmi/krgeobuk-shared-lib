import { applyDecorators } from '@nestjs/common';
import { IsValidOptions } from '@krgeobuk/core/interfaces';
import { SwaggerApiProperty } from '@krgeobuk/swagger/decorators';
import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

// 사용자 프로필 유효성 검사
export function IsValidProfileImage(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false, isExpose = false } = options;

  const decorators = [
    SwaggerApiProperty({
      example:
        'https://yt3.ggpht.com/yti/ANjgQV-jbwsLEWnWPVS2r82jtApxqmShu-nPXW-_S1n7FCmlug=s88-c-k-c0x00ffffff-no-rj',
      description: '프로필 이미지 URL',
    }),
    IsUrl(
      { protocols: ['https'] }, // HTTPS URL만 허용
      { message: 'Profile image must be a valid HTTPS URL' }
    ),
    MaxLength(2048, { message: 'Profile image URL is too long' }), // URL 길이 제한,
  ];

  if (isExpose) {
    decorators.push(Expose());
  }

  if (isOptional) {
    return applyDecorators(IsOptional(), ...decorators);
  }
  return applyDecorators(IsNotEmpty({ message: '프로필 URL은 필수입니다' }), ...decorators);
}
