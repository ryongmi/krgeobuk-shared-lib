import { HttpException } from '@nestjs/common';

import { RoleError } from './role.error.js';

export class RoleException {
  // 000 ~ 099: 서버 에러
  static roleFetchError(): HttpException {
    const e = RoleError.ROLE_FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static roleCreateError(): HttpException {
    const e = RoleError.ROLE_CREATE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static roleUpdateError(): HttpException {
    const e = RoleError.ROLE_UPDATE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static roleDeleteError(): HttpException {
    const e = RoleError.ROLE_DELETE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  // 100 ~ 199: 클라이언트 에러
  static roleNotFound(): HttpException {
    const e = RoleError.ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static roleAlreadyExists(): HttpException {
    const e = RoleError.ROLE_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static roleInvalidPriority(): HttpException {
    const e = RoleError.ROLE_INVALID_PRIORITY;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static roleInvalidService(): HttpException {
    const e = RoleError.ROLE_INVALID_SERVICE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static rolePermissionConflict(): HttpException {
    const e = RoleError.ROLE_PERMISSION_CONFLICT;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
