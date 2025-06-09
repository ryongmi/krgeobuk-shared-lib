import { Expose } from 'class-transformer';

import { ErrorFormatInterface } from '../../interfaces';
import {
  IsValidStatusCode,
  IsValidError,
  IsValidMessage,
} from '../../decorators/validation/format';

export class ErrorFormatDto implements ErrorFormatInterface {
  @IsValidStatusCode()
  @Expose()
  statusCode!: number;

  @IsValidError()
  @Expose()
  error!: string;

  @IsValidMessage()
  @Expose()
  message!: string;
}
