import type { ResponseFormat } from '../../interfaces/index.js';
import {
  ExposeCode,
  ExposeStatusCode,
  ExposeIsLogin,
  ExposeMessage,
  ExposeData,
} from '../../decorators/validation/index.js';

import { CoreResponse } from '../../response/index.js';

export class ResponseFormatDto<T> implements ResponseFormat<T> {
  @ExposeCode()
  code: string = CoreResponse.REQUEST_SUCCESS.code;

  @ExposeStatusCode()
  statusCode: number = CoreResponse.REQUEST_SUCCESS.statusCode;

  @ExposeMessage()
  message: string = CoreResponse.REQUEST_SUCCESS.message;

  @ExposeIsLogin()
  isLogin!: boolean;

  @ExposeData()
  data!: T;
}
