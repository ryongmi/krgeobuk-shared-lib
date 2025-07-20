import '@krgeobuk/core/interfaces/express';

import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { decodeAccessToken } from '../utils/index.js';

/**
 * 선택적 액세스 토큰 가드
 * 토큰이 있으면 검증하고, 없으면 통과시킴
 * 로그인 여부에 따라 다른 응답을 제공해야 하는 API에서 사용
 */
@Injectable()
export class OptionalAccessTokenGuard implements CanActivate {
  constructor(
    @Inject('JWT_ACCESS_PUBLIC_KEY') private readonly publicKey: string,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 1. accessToken을 body 또는 Authorization 헤더에서 추출
    let token = request.body.accessToken;

    // 기본값 세팅
    request.jwt = { id: '' };

    if (!token) {
      const authorization = request.headers.authorization;

      // 토큰이 없으면 통과 (옵셔널)
      if (!authorization) {
        return true;
      }

      // Authorization 헤더가 있지만 Bearer 형식이 아니면 통과
      if (!authorization.startsWith('Bearer ')) {
        return true;
      }

      token = authorization.split(' ')[1];
    }

    // 토큰이 빈 문자열이면 통과
    if (!token || token.trim() === '') {
      return true;
    }

    try {
      // 2. 토큰이 있으면 검증
      const { id, tokenData } = decodeAccessToken({ token, publicKey: this.publicKey });

      // 3. 요청에 유저 정보 주입
      request.jwt = { id, tokenData };

      return true;
    } catch (error: unknown) {
      console.error('Optional Access Token 검증 실패:', error);

      // 토큰이 유효하지 않아도 통과 (옵셔널)
      // 단, jwt 정보는 주입하지 않음
      return true;
    }
  }
}

