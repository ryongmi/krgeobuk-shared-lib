import type { ErrorFormat } from '../../interfaces/index.js';
import { ExposeStatusCode, ExposeError, ExposeMessage } from '../../decorators/validation/index.js';

export class ErrorFormatDto implements ErrorFormat {
  @ExposeStatusCode()
  statusCode: number = 500;

  @ExposeError()
  error!: string;

  @ExposeMessage()
  message!: string;
}
