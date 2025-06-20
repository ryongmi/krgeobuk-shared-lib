import { ExposeAccessToken } from '@krgeobuk/auth/src/decorators';
import { ExposeNested } from '@krgeobuk/core/decorators';
import { LoggedInUserDto } from '@krgeobuk/user/dtos';
import type { LoginResponse } from '@krgeobuk/auth/src/interfaces';

export class LoginResponseDto implements LoginResponse<LoggedInUserDto> {
  @ExposeAccessToken()
  accessToken!: string;

  @ExposeNested({
    typeFn: () => LoggedInUserDto,
    description: '로그인 사용자 정보',
  })
  user!: LoggedInUserDto;
}
