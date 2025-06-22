import {
  BadRequestException,
  // BadRequestException,
  // ForbiddenException,
  HttpException,
  InternalServerErrorException,
  // HttpStatus,
  // InternalServerErrorException,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import type { TokenType } from '../types';

export class JwtException {
  private static label(type: TokenType): string {
    return type === 'access' ? 'Access' : 'Refresh';
  }

  static notFound(type: TokenType): HttpException {
    return new UnauthorizedException(`${this.label(type)} 토큰이 존재하지 않습니다.`);
  }

  static invalid(type: TokenType): UnauthorizedException {
    return new UnauthorizedException(`${this.label(type)} 토큰이 유효하지 않거나 만료되었습니다.`);
  }

  // 토큰은 유효하지만 exp 필드로 만료된 상태일 때 발생
  static expired(type: TokenType): UnauthorizedException {
    return new UnauthorizedException(`${this.label(type)} 토큰이 만료되었습니다.`);
  }

  // 구조가 JWT 형식(xxx.yyy.zzz)이 아닌 경우
  static malformed(type: TokenType): UnauthorizedException {
    return new UnauthorizedException(`${this.label(type)} 토큰 형식이 올바르지 않습니다.`);
  }

  // 예상하지 못한 알고리즘으로 서명된 토큰 (예: HS256 외 다른 방식)
  static unsupported(type: TokenType): BadRequestException {
    return new BadRequestException(`${this.label(type)} 토큰은 지원되지 않는 형식입니다.`);
  }

  // Authorization 헤더는 존재하나, Bearer <token> 형식이 아닌 경우
  static missingBearer(): UnauthorizedException {
    return new UnauthorizedException(`Authorization 헤더가 Bearer 형식이 아닙니다.`);
  }

  static configMissing(type: TokenType): HttpException {
    return new InternalServerErrorException(
      `${this.label(type)} 토큰 설정값(JWT config)이 누락되었습니다.`
    );
  }

  static secretMissing(type: TokenType): HttpException {
    return new InternalServerErrorException(
      `${this.label(type)} 토큰 시크릿(secret)이 설정되어 있지 않습니다.`
    );
  }

  static expireMissing(type: TokenType): HttpException {
    return new InternalServerErrorException(
      `${this.label(type)} 토큰 만료시간(expireIn)이 설정되어 있지 않습니다.`
    );
  }

  static signFailure(type: TokenType): InternalServerErrorException {
    return new InternalServerErrorException(`${this.label(type)} 토큰 생성(서명)에 실패했습니다.`);
  }

  static decryptionFailed(type: TokenType): HttpException {
    return new UnauthorizedException(`${this.label(type)} 토큰 복호화에 실패했습니다.`);
  }
}
