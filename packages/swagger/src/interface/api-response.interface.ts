import { Type } from '@nestjs/common';

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'object';

export interface SwaggerApiResponseOptions {
  status: number;
  description: string;
  dto?: Type<unknown> | null;
  type?: PrimitiveType | Type<unknown>;
  isArray?: boolean;
  extraModels?: Array<Type<unknown>>;
}

export interface SwaggerPaginatedResponseOptions {
  status: number;
  description: string;
  dto: Type<unknown>;
  extraModels?: Array<Type<unknown>>;
}
