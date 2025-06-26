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
      map((data: object | null) => {
        const transformed =
          options.dto !== undefined
            ? plainToInstance(options.dto, data, {
                excludeExtraneousValues: true,
              })
            : data;

        return {
          code: options?.code || CoreCode.REQUEST_SUCCESS,
          statusCode: statusCode || HttpStatus.OK,
          message: options?.message || CoreMessage.REQUEST_SUCCESS,
          isLogin: Boolean(req?.user),
          // Boolean(req.cookies['refreshToken']) ||
          // 'accessToken' in transformed,
          data: transformed,
        };
      })
    );
  }
}
