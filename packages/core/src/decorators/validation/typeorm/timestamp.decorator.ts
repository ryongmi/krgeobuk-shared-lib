import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IsValidOptions } from '../../../interfaces/index.js';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsDate } from 'class-validator';

// createdAt 유효성 검사
export function IsValidCreatedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'created_at',
    type: String,
    format: 'date-time',
    description: '생성된 날짜',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsDate()];
  const exposeDators = [Expose({ name: 'created_at' })];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'CreatedAt는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeCreatedAt(): PropertyDecorator {
  const propertyData = {
    name: 'created_at',
    type: String,
    format: 'date-time',
    description: '생성된 날짜',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// updatedAt 유효성 검사
export function IsValidUpdatedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'updated_at',
    type: String,
    format: 'date-time',
    description: '수정된 날짜',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsDate()];
  const exposeDators = [Expose({ name: 'updated_at' })];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'UpdatedAt는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeUpdatedAt(): PropertyDecorator {
  const propertyData = {
    name: 'updated_at',
    type: String,
    format: 'date-time',
    description: '수정된 날짜',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}

// deletedAt 유효성 검사
export function IsValidDeletedAt(options: IsValidOptions = {}): PropertyDecorator {
  const { isOptional = false } = options;

  const propertyData = {
    name: 'deleted_at',
    type: String,
    format: 'date-time',
    nullable: true,
    description: '삭제된 날짜',
  };
  const apiDecorator = isOptional ? ApiPropertyOptional(propertyData) : ApiProperty(propertyData);
  const validators = [IsDate()];
  const exposeDators = [Expose({ name: 'deleted_at' })];
  const optionality = isOptional ? IsOptional() : IsNotEmpty({ message: 'DeletedAt는 필수입니다' });

  return applyDecorators(apiDecorator, optionality, ...validators, ...exposeDators);
}

export function ExposeDeletedAt(): PropertyDecorator {
  const propertyData = {
    name: 'deleted_at',
    type: String,
    format: 'date-time',
    nullable: true,
    description: '삭제된 날짜',
  };

  return applyDecorators(ApiProperty(propertyData), Expose());
}
