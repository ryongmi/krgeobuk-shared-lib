// import '@krgeobuk/core/interfaces/express';

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// import type { Request } from 'express';

// import type { PermissionDetail } from '../interfaces/index.js';

// export const CurrentPermission = createParamDecorator(
//   (data: keyof PermissionDetail | undefined, ctx: ExecutionContext): PermissionDetail => {
//     const request = ctx.switchToHttp().getRequest<Request>();
//     return request.permission as PermissionDetail;
//     // const permission = request.permission as PermissionDetail;

//     // return data ? permission?.[data] : permission;
//   }
// );
