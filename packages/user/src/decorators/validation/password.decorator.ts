import { applyDecorators } from '@nestjs/common';
import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';
import { IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

// 비밀번호 유효성 검사
export function IsValidPassword(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { example: 'P@ssw0rd!', description: '사용자 비밀번호' };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: '비밀번호는 최소 하나의 대문자, 소문자, 숫자나 특수문자를 포함해야 합니다',
    }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '비밀번호는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposePassword(): PropertyDecorator {
  const propertyData = { example: 'P@ssw0rd!', description: '사용자 비밀번호' };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}

export function IsValidCurrentPassword(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'current_password',
    type: String,
    example: 'P@ssw0rd!',
    description: '현재 사용자 비밀번호',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: '비밀번호는 최소 하나의 대문자, 소문자, 숫자나 특수문자를 포함해야 합니다',
    }),
  ];
  const exposeDators = [Expose({ name: 'current_password' })];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '비밀번호는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function IsValidNewPassword(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'new_password',
    type: String,
    example: 'P@ssw0rd!',
    description: '변경할 사용자 비밀번호',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다' }),
    Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: '비밀번호는 최소 하나의 대문자, 소문자, 숫자나 특수문자를 포함해야 합니다',
    }),
  ];
  const exposeDators = [Expose({ name: 'new_password' })];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: '비밀번호는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}
