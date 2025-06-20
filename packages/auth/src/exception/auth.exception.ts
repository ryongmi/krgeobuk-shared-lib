import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  // HttpStatus,
  InternalServerErrorException,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthException {
  /** 상태 값 누락 */
  static stateNotFound(): HttpException {
    return new UnauthorizedException('State 값이 누락되었습니다.');
  }

  /** 만료된 상태 */
  static stateExpired(): HttpException {
    return new UnauthorizedException('State 값이 유효하지 않거나 만료되었습니다.');
  }

  /** 존재하지 않는 상태 */
  static stateNotExist(): HttpException {
    return new ForbiddenException('존재하지 않거나 만료된 state 값입니다.');
  }

  /** 로그인 중 서버 오류 */
  static loginError(): HttpException {
    return new InternalServerErrorException('로그인 처리 중 오류가 발생했습니다.');
  }

  /** 잘못된 요청 */
  static invalidRequest(): HttpException {
    return new BadRequestException('잘못된 요청입니다.');
  }
}
