import '@krgeobuk/core/interfaces/express';

import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { JwtException } from '@krgeobuk/jwt/src/exception';
import { decodeAccessToken } from '@krgeobuk/jwt/src/utils';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject('JWT_ACCESS_SECRET') private readonly secret: string,
    private readonly reflector: Reflector // 필요한 경우 Role같은 거 추후 적용용
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 1. accessToken을 body 또는 Authorization 헤더에서 추출
    let token = request.body.accessToken;

    if (!token) {
      const authorization = request.headers.authorization;

      if (!authorization) throw JwtException.notFound('access');
      if (!authorization.startsWith('Bearer ')) throw JwtException.missingBearer();

      token = authorization.split(' ')[1];
    }

    try {
      // 2. 토큰 검증
      const { id, tokenData } = decodeAccessToken({ token, secret: this.secret });

      // 3. 요청에 유저 정보 주입
      request.user = { id, tokenData };

      return true;
    } catch (error: unknown) {
      console.error('Access Token 검증 실패:', error);

      if (error instanceof Error && 'name' in error) {
        const name = (error as { name: string }).name;

        switch (name) {
          case 'TokenExpiredError':
            throw JwtException.expired('access');
          case 'JsonWebTokenError':
            throw JwtException.malformed('access');
          case 'NotBeforeError':
            throw JwtException.unsupported('access');
          default:
            throw JwtException.invalid('access');
        }
      }

      // Error 객체가 아닌 예상치 못한 에러
      throw JwtException.invalid('access');
    }
  }
}
