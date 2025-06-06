import { Type } from '@nestjs/common';

export class SwaagerApiQueryDto {
  name!: string;
  type!: Type;
  description: string = '';
  required?: boolean = true;
}
