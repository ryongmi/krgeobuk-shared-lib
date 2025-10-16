import { ExposeNested } from '@krgeobuk/core/decorators';
import { ExposeAccessToken } from '@krgeobuk/jwt/decorators';
import { UserProfileDto } from '@krgeobuk/user/dtos';

import type { AuthInitializeResponse } from '../interfaces/initialize-response.interface.js';

/**
 * 클라이언트 초기화 응답 DTO
 * RefreshToken으로 AccessToken과 사용자 정보를 한번에 반환
 */
export class AuthInitializeResponseDto implements AuthInitializeResponse {
  @ExposeAccessToken()
  accessToken!: string;

  @ExposeNested({
    type: UserProfileDto,
    typeFn: () => UserProfileDto,
    description: '해당 User의 권한 및 역할 목록 데이터',
  })
  user!: UserProfileDto;
  // @ApiProperty({
  //   description: '사용자 프로필 정보 (OAuth, 권한, 서비스 포함)',
  //   type: 'object',
  // })
  // user!: UserProfile;
}
