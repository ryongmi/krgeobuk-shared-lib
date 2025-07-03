import { ExposeNested } from '@krgeobuk/core/decorators';
import { ExposeAccessToken } from '@krgeobuk/jwt/decorators';
import { LoggedInUserDto } from '@krgeobuk/shared/user';

import type { AuthLoginResponse } from '../interfaces/index.js';

export class AuthLoginResponseDto implements AuthLoginResponse {
  @ExposeAccessToken()
  accessToken!: string;

  @ExposeNested({
    type: LoggedInUserDto,
    typeFn: () => LoggedInUserDto,
    description: '로그인 사용자 정보',
  })
  user!: LoggedInUserDto;
}
