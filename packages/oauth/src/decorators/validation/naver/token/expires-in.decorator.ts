import { applyDecorators } from '@nestjs/common';

import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { SwaggerApiProperty, SwaggerApiPropertyOptional } from '@krgeobuk/swagger/decorators';
import type { IsValidOptions } from '@krgeobuk/core/interfaces';

// Naver OAuth Token ExpiresIn 유효성 검사
export function IsValidNaverExpiresIn(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'expires_in',
    type: String,
    example: '3600',
    description: 'Naver OAuth Token ExpiresIn',
  };
  const apiDecorator = isOptional
    ? SwaggerApiPropertyOptional(propertyData)
    : SwaggerApiProperty(propertyData);
  const validators = [Transform(({ value }) => Number(value)), IsNumber(), Min(1)];
  const exposeDators = [Expose({ name: 'expires_in' })];
  const optionality = isOptional
    ? IsOptional()
    : IsNotEmpty({ message: 'Naver OAuth Token ExpiresIn는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeNaverExpiresIn(): PropertyDecorator {
  const propertyData = {
    name: 'expires_in',
    type: String,
    example: '3600',
    description: 'Naver OAuth Token ExpiresIn',
  };

  return applyDecorators(SwaggerApiProperty(propertyData), Expose());
}
