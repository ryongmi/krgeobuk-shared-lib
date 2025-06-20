import { IsValidAccessToken } from '@krgeobuk/auth/src/decorators';
import { IsValidNested } from '@krgeobuk/core/decorators';
import { LoggedInUserDto } from '@krgeobuk/user/dtos';
import type { LoginResponse } from '@krgeobuk/auth/src/interfaces';

export class LoginResponseDto implements LoginResponse<LoggedInUserDto> {
  @IsValidAccessToken({ isOptional: true, isExpose: true })
  accessToken?: string;

  @IsValidNested({
    typeFn: () => LoggedInUserDto,
    description: '로그인 사용자 정보',
    options: { isExpose: true },
  })
  user!: LoggedInUserDto;
}
