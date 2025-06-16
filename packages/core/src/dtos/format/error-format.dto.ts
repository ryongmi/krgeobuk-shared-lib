import type { ErrorFormat } from '@krgeobuk/core/src/interfaces';
import {
  IsValidStatusCode,
  IsValidError,
  IsValidMessage,
} from '@krgeobuk/core/src/decorators/validation';

export class ErrorFormatDto implements ErrorFormat {
  @IsValidStatusCode({ isExpose: true })
  statusCode!: number;

  @IsValidError({ isExpose: true })
  error!: string;

  @IsValidMessage({ isExpose: true })
  message!: string;
}
