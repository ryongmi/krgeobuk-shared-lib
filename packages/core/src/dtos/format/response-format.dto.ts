import { Expose } from 'class-transformer';

import { ResponseFormatInterface } from '../../interfaces';
import { IsValidStatusCode, IsValidIsLogin, IsValidData } from '../../decorators/validation/format';

export class ResponseFormatDto<T> implements ResponseFormatInterface<T> {
  @IsValidStatusCode()
  @Expose()
  statusCode: number = 200;

  @IsValidIsLogin()
  @Expose()
  isLogin!: boolean;

  @IsValidData()
  @Expose()
  data!: T;
}
