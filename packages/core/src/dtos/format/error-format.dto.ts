import type { ErrorFormat } from '../../interfaces/index.js';
import {
  ExposeCode,
  ExposeStatusCode,
  ExposeError,
  ExposeMessage,
} from '../../decorators/validation/index.js';

import { CoreError } from '../../exception/index.js';

export class ErrorFormatDto implements ErrorFormat {
  @ExposeCode()
  code: string = CoreError.SERVER_ERROR.code;

  @ExposeStatusCode()
  statusCode: number = CoreError.SERVER_ERROR.statusCode;

  @ExposeMessage()
  message: string = CoreError.SERVER_ERROR.message;

  @ExposeError()
  error!: string;
}
