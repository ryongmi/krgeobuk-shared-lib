import type { ErrorFormat } from '@krgeobuk/core/src/interfaces';
import {
  ExposeStatusCode,
  ExposeError,
  ExposeMessage,
} from '@krgeobuk/core/src/decorators/validation';

export class ErrorFormatDto implements ErrorFormat {
  @ExposeStatusCode()
  statusCode!: number;

  @ExposeError()
  error!: string;

  @ExposeMessage()
  message!: string;
}
