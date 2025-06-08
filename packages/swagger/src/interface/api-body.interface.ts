import { Type } from '@nestjs/common';

export interface SwaggerApiBodyOptions {
  dto: Type<unknown>;
  description?: string;
  required?: boolean;
}
