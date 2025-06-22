import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidOptions } from '../../../interfaces';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsDate } from 'class-validator';

// createdAt 유효성 검사
export function IsValidCreatedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { type: String, format: 'date-time', description: '생성된 날짜' };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsDate()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'CreatedAt는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeCreatedAt(): PropertyDecorator {
  const propertyData = { type: String, format: 'date-time', description: '생성된 날짜' };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// updatedAt 유효성 검사
export function IsValidUpdatedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = { type: String, format: 'date-time', description: '수정된 날짜' };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsDate()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'UpdatedAt는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeUpdatedAt(): PropertyDecorator {
  const propertyData = { type: String, format: 'date-time', description: '수정된 날짜' };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// deletedAt 유효성 검사
export function IsValidDeletedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    type: String,
    format: 'date-time',
    nullable: true,
    description: '삭제된 날짜',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsDate()];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'DeletedAt는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators);
}

export function ExposeDeletedAt(): PropertyDecorator {
  const propertyData = {
    type: String,
    format: 'date-time',
    nullable: true,
    description: '삭제된 날짜',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
