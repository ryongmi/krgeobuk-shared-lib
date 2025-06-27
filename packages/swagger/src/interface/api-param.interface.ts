import { Type } from '@nestjs/common';

export interface SwaggerApiParamOptions {
  name: string;
  type: Type;
  description?: string;
  required?: boolean;
  example?: string;
}
