import { applyDecorators } from '@nestjs/common';

import { IsString, MaxLength, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidAllowedOptions, ExposeAllowedOptions } from '@krgeobuk/core/interfaces';

import { ACCOUNT_MERGE_STATUS_VALUES } from '../enum/index.js';

// Account merge status 유효성 검사
export function IsValidStatus(options: IsValidAllowedOptions = {}): PropertyDecorator {
  const { isOptional = false, allowed: allowedStatus = ACCOUNT_MERGE_STATUS_VALUES } = options;

  const propertyData = {
    example: allowedStatus[0],
    description: `Account merge status. 허용값: ${allowedStatus.join(', ')}`,
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [
    IsString(),
    MaxLength(50, { message: 'Status는 최대 50자 입니다' }),
    IsIn(allowedStatus, {
      message: `Status는 다음 값 중 하나여야 합니다: ${allowedStatus.join(', ')}`,
    }),
  ];
  const exposeDators = [Expose()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'Status는 필수입니다' });
  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeStatus(options: ExposeAllowedOptions = {}): PropertyDecorator {
  const { allowed: allowedStatus = ACCOUNT_MERGE_STATUS_VALUES } = options;

  const propertyData = {
    example: allowedStatus[0],
    description: `Account merge status. 허용값: ${allowedStatus.join(', ')}`,
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
