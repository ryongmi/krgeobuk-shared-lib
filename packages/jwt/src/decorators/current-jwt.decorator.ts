import '@krgeobuk/core/interfaces/express';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from 'express';

export const CurrentJwt = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.jwt;
});
