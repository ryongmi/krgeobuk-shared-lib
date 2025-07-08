import { PermissionCode } from '../codes/index.js';
import { PermissionMessage } from '../messages/index.js';

export class PermissionError {
  // 000 ~ 099: 서버 에러
  static readonly PERMISSION_FETCH_ERROR = {
    code: PermissionCode.PERMISSION_FETCH_ERROR,
    message: PermissionMessage.PERMISSION_FETCH_ERROR,
    statusCode: 500,
  };

  static readonly PERMISSION_CREATE_ERROR = {
    code: PermissionCode.PERMISSION_CREATE_ERROR,
    message: PermissionMessage.PERMISSION_CREATE_ERROR,
    statusCode: 500,
  };

  static readonly PERMISSION_UPDATE_ERROR = {
    code: PermissionCode.PERMISSION_UPDATE_ERROR,
    message: PermissionMessage.PERMISSION_UPDATE_ERROR,
    statusCode: 500,
  };

  static readonly PERMISSION_DELETE_ERROR = {
    code: PermissionCode.PERMISSION_DELETE_ERROR,
    message: PermissionMessage.PERMISSION_DELETE_ERROR,
    statusCode: 500,
  };

  // 100 ~ 199: 클라이언트 에러
  static readonly PERMISSION_NOT_FOUND = {
    code: PermissionCode.PERMISSION_NOT_FOUND,
    message: PermissionMessage.PERMISSION_NOT_FOUND,
    statusCode: 404,
  };

  static readonly PERMISSION_ALREADY_EXISTS = {
    code: PermissionCode.PERMISSION_ALREADY_EXISTS,
    message: PermissionMessage.PERMISSION_ALREADY_EXISTS,
    statusCode: 409,
  };

  static readonly PERMISSION_INVALID_ACTION = {
    code: PermissionCode.PERMISSION_INVALID_ACTION,
    message: PermissionMessage.PERMISSION_INVALID_ACTION,
    statusCode: 400,
  };

  static readonly PERMISSION_INVALID_SERVICE = {
    code: PermissionCode.PERMISSION_INVALID_SERVICE,
    message: PermissionMessage.PERMISSION_INVALID_SERVICE,
    statusCode: 400,
  };
}