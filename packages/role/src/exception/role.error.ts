import { RoleCode } from '../codes/index.js';
import { RoleMessage } from '../messages/index.js';

export class RoleError {
  // 000 ~ 099: 서버 에러
  static readonly ROLE_FETCH_ERROR = {
    code: RoleCode.ROLE_FETCH_ERROR,
    message: RoleMessage.ROLE_FETCH_ERROR,
    statusCode: 500,
  };

  static readonly ROLE_CREATE_ERROR = {
    code: RoleCode.ROLE_CREATE_ERROR,
    message: RoleMessage.ROLE_CREATE_ERROR,
    statusCode: 500,
  };

  static readonly ROLE_UPDATE_ERROR = {
    code: RoleCode.ROLE_UPDATE_ERROR,
    message: RoleMessage.ROLE_UPDATE_ERROR,
    statusCode: 500,
  };

  static readonly ROLE_DELETE_ERROR = {
    code: RoleCode.ROLE_DELETE_ERROR,
    message: RoleMessage.ROLE_DELETE_ERROR,
    statusCode: 500,
  };

  // 100 ~ 199: 클라이언트 에러
  static readonly ROLE_NOT_FOUND = {
    code: RoleCode.ROLE_NOT_FOUND,
    message: RoleMessage.ROLE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly ROLE_ALREADY_EXISTS = {
    code: RoleCode.ROLE_ALREADY_EXISTS,
    message: RoleMessage.ROLE_ALREADY_EXISTS,
    statusCode: 409,
  };

  static readonly ROLE_INVALID_PRIORITY = {
    code: RoleCode.ROLE_INVALID_PRIORITY,
    message: RoleMessage.ROLE_INVALID_PRIORITY,
    statusCode: 400,
  };

  static readonly ROLE_INVALID_SERVICE = {
    code: RoleCode.ROLE_INVALID_SERVICE,
    message: RoleMessage.ROLE_INVALID_SERVICE,
    statusCode: 400,
  };

  static readonly ROLE_PERMISSION_CONFLICT = {
    code: RoleCode.ROLE_PERMISSION_CONFLICT,
    message: RoleMessage.ROLE_PERMISSION_CONFLICT,
    statusCode: 400,
  };
}
