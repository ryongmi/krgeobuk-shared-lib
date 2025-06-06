import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ResponseFormatInterface } from '../../interfaces';

export class ResponseFormatDto<T> implements ResponseFormatInterface<T> {
  @ApiProperty({
    example: 0,
    description: '해당 HTTP 코드',
    type: Number,
  })
  @Expose()
  statusCode: number = 200;

  @ApiProperty({
    example: false,
    description: '로그인 유무',
    type: Boolean,
  })
  @Expose()
  isLogin!: boolean;

  @ApiProperty({ type: Object })
  @Expose()
  data!: T;
}
