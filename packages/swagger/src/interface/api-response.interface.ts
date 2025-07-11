import { Type } from '@nestjs/common';

export interface SwaggerApiResponseOptions {
  status: number;
  description: string;
  dto?: Type<unknown> | null;
  isArray?: boolean;
  extraModels?: Array<Type<unknown>>;
}

export interface SwaggerPaginatedResponseOptions {
  status: number;
  description: string;
  dto: Type<unknown>;
  extraModels?: Array<Type<unknown>>;
}
