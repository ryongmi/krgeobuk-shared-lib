import { ApiPropertyOptions } from '@nestjs/swagger';

export class SwaagerApiPropertyDto {
  example: ApiPropertyOptions['example'];
  description?: ApiPropertyOptions['description'];
  required?: boolean = false;
  default?: ApiPropertyOptions['default'];
  nullable?: ApiPropertyOptions['nullable'];
  format?: ApiPropertyOptions['format'];
  enum?: ApiPropertyOptions['enum'];
  isArray?: ApiPropertyOptions['isArray'];
  readOnly?: ApiPropertyOptions['readOnly'];
  deprecated?: ApiPropertyOptions['deprecated'];
}

// export class SwaagerApiPropertyDto {
//   example: unknown;
//   description: string = '';
//   required?: boolean = true;
//   default?: unknown;
//   nullable: boolean = false;
//   format?: string;
//   type?: Type | string;
//   enum?: string[] | number[];
//   isArray?: boolean = false;
//   readonly?: boolean = false;
//   deprecated?: boolean = false;
// }
