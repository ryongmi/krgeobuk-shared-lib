import { ResponseFormat } from '@krgeobuk/core/src/interfaces';
import {
  IsValidStatusCode,
  IsValidIsLogin,
  IsValidData,
} from '@krgeobuk/core/src/decorators/validation';

export class ResponseFormatDto<T> implements ResponseFormat<T> {
  @IsValidStatusCode({ isExpose: true })
  statusCode: number = 200;

  @IsValidIsLogin({ isExpose: true })
  isLogin!: boolean;

  @IsValidData({ isExpose: true })
  data!: T;
}
