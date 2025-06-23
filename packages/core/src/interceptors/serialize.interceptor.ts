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
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

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
      map((data: object | null) => {
        const transformed =
          options.dto !== undefined
            ? plainToClass(options.dto, data, {
                excludeExtraneousValues: true,
              })
            : data;

        return {
          statusCode: statusCode || HttpStatus.OK,
          message: options.message || '요청이 성공적으로 처리되었습니다.',
          isLogin: Boolean(req?.user),
          // Boolean(req.cookies['refreshToken']) ||
          // 'accessToken' in transformed,
          data: transformed,
        };
      })
    );
  }
}
