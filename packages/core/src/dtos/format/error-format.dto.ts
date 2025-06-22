import type { ErrorFormat } from '../../interfaces';
import { ExposeStatusCode, ExposeError, ExposeMessage } from '../../decorators/validation';

export class ErrorFormatDto implements ErrorFormat {
  @ExposeStatusCode()
  statusCode!: number;

  @ExposeError()
  error!: string;

  @ExposeMessage()
  message!: string;
}
