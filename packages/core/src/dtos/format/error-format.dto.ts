import {
  ExposeErrorCode,
  ExposeStatusCode,
  ExposeError,
  ExposeErrorMessage,
} from '../../decorators/validation/index.js';
import { CoreError } from '../../exception/index.js';
import type { ErrorFormat } from '../../interfaces/index.js';

export class ErrorFormatDto implements ErrorFormat {
  @ExposeErrorCode()
  code: string = CoreError.SERVER_ERROR.code;

  @ExposeStatusCode()
  statusCode: number = CoreError.SERVER_ERROR.statusCode;

  @ExposeErrorMessage()
  message: string = CoreError.SERVER_ERROR.message;

  @ExposeError()
  error!: string;
}
