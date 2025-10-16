import '../interfaces/express/index.js';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { CoreCode } from '../codes/index.js';
import { CoreMessage } from '../messages/index.js';
import { SERIALIZE_META_KEY } from '../constants/index.js';
import type { SerializeOptions } from '../interfaces/index.js';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const statusCode = context.switchToHttp().getResponse().statusCode;

    const options: SerializeOptions =
      this.reflector.get<SerializeOptions>(SERIALIZE_META_KEY, context.getHandler()) || {};

    return next.handle().pipe(
      map((data: unknown) => {
        let transformed: unknown;

        if (options.dto !== undefined) {
          // DTO가 있으면 기존 로직
          transformed = plainToInstance(options.dto, data, {
            excludeExtraneousValues: true,
          });
        } else {
          // DTO가 없으면 primitive type 처리
          transformed = this.handlePrimitiveType(data);
        }

        return {
          code: options?.code || CoreCode.REQUEST_SUCCESS,
          statusCode: statusCode || HttpStatus.OK,
          message: options?.message || CoreMessage.REQUEST_SUCCESS,
          isLogin: Boolean(req?.jwt?.userId),
          data: transformed,
        };
      })
    );
  }

  /**
   * Primitive type 데이터 처리
   */
  private handlePrimitiveType(data: unknown): unknown {
    // null이나 undefined는 그대로 반환
    if (data === null || data === undefined) {
      return data;
    }

    // primitive array 처리 (string[], number[], boolean[])
    if (Array.isArray(data)) {
      const firstItem = data[0];
      if (firstItem !== undefined) {
        const itemType = typeof firstItem;
        // 모든 요소가 같은 primitive type인지 확인
        if (
          ['string', 'number', 'boolean'].includes(itemType) &&
          data.every((item) => typeof item === itemType)
        ) {
          return data; // primitive array는 그대로 유지
        }
      }
      return data; // 빈 배열이거나 mixed type이면 그대로 반환
    }

    // primitive value 처리
    if (['string', 'number', 'boolean'].includes(typeof data)) {
      return data;
    }

    // object인 경우 기본 처리
    return data;
  }
}
