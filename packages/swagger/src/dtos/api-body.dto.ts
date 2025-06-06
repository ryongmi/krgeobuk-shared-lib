import { Type } from '@nestjs/common';

export class SwaagerApiBodyDto {
  dto!: Type<unknown>;
  description: string = '';
  required?: boolean = true;
}
