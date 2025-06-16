import { IsValidAccessToken } from '@krgeobuk/jwt/decorators';
import { IsValidNested } from '@krgeobuk/core/decorators';
import type { LoginResponse } from '@krgeobuk/user/src/interfaces';
import { LoginUserDto } from './login-user.dto';

export class LoginResponseDto implements LoginResponse<LoginUserDto> {
  @IsValidAccessToken({ isOptional: true, isExpose: true })
  accessToken?: string;

  @IsValidNested({
    typeFn: () => LoginUserDto,
    description: '로그인 사용자 정보',
    options: { isExpose: true },
  })
  user!: LoginUserDto;
}
