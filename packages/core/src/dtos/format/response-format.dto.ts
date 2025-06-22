import type { ResponseFormat } from '../../interfaces';
import { ExposeStatusCode, ExposeIsLogin, ExposeData } from '../../decorators/validation';

export class ResponseFormatDto<T> implements ResponseFormat<T> {
  @ExposeStatusCode()
  statusCode: number = 200;

  @ExposeIsLogin()
  isLogin!: boolean;

  @ExposeData()
  data!: T;
}
