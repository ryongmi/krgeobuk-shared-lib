import { Type } from '@nestjs/common';

export class SwaagerApiResponseDto {
  status!: number;
  description: string = '';
  dto?: Type<unknown> | null;
}
