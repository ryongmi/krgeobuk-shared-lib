import type { ResponseFormat } from '@krgeobuk/core/src/interfaces';
import {
  ExposeStatusCode,
  ExposeIsLogin,
  ExposeData,
} from '@krgeobuk/core/src/decorators/validation';

export class ResponseFormatDto<T> implements ResponseFormat<T> {
  @ExposeStatusCode()
  statusCode: number = 200;

  @ExposeIsLogin()
  isLogin!: boolean;

  @ExposeData()
  data!: T;
}
