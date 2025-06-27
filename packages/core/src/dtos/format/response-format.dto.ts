import {
  ExposeSuccessCode,
  ExposeStatusCode,
  ExposeIsLogin,
  ExposeSuccessMessage,
  ExposeData,
} from '../../decorators/validation/index.js';
import { CoreResponse } from '../../response/index.js';
import type { ResponseFormat } from '../../interfaces/index.js';

export class ResponseFormatDto<T> implements ResponseFormat<T> {
  @ExposeSuccessCode()
  code: string = CoreResponse.REQUEST_SUCCESS.code;

  @ExposeStatusCode()
  statusCode: number = CoreResponse.REQUEST_SUCCESS.statusCode;

  @ExposeSuccessMessage()
  message: string = CoreResponse.REQUEST_SUCCESS.message;

  @ExposeIsLogin()
  isLogin!: boolean;

  @ExposeData()
  data!: T;
}
