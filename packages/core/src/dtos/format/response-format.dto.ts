import type { ResponseFormat } from '../../interfaces/index.js';
import { ExposeStatusCode, ExposeIsLogin, ExposeData } from '../../decorators/validation/index.js';

export class ResponseFormatDto<T> implements ResponseFormat<T> {
  @ExposeStatusCode()
  statusCode: number = 200;

  @ExposeIsLogin()
  isLogin!: boolean;

  @ExposeData()
  data!: T;
}
