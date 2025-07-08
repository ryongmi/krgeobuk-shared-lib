import { HttpException } from '@nestjs/common';

import { PermissionError } from './permission.error.js';

export class PermissionException {
  static permissionFetchError(): HttpException {
    const e = PermissionError.PERMISSION_FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionCreateError(): HttpException {
    const e = PermissionError.PERMISSION_CREATE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionUpdateError(): HttpException {
    const e = PermissionError.PERMISSION_UPDATE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionDeleteError(): HttpException {
    const e = PermissionError.PERMISSION_DELETE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionNotFound(): HttpException {
    const e = PermissionError.PERMISSION_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionAlreadyExists(): HttpException {
    const e = PermissionError.PERMISSION_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionInvalidAction(): HttpException {
    const e = PermissionError.PERMISSION_INVALID_ACTION;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  static permissionInvalidService(): HttpException {
    const e = PermissionError.PERMISSION_INVALID_SERVICE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}