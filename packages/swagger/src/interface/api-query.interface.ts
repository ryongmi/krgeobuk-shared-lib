import { Type } from '@nestjs/common';

export interface SwaggerApiQueryOptions {
  name: string;
  type: Type;
  description?: string;
  required?: boolean;
}
