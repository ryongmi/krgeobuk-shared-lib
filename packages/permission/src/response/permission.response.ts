import { PermissionCode } from '../codes/index.js';
import { PermissionMessage } from '../messages/index.js';

export class PermissionResponse {
  static readonly FETCH_SUCCESS = {
    code: PermissionCode.PERMISSION_FETCH_SUCCESS,
    message: PermissionMessage.PERMISSION_FETCH_SUCCESS,
    statusCode: 200,
  };

  static readonly CREATE_SUCCESS = {
    code: PermissionCode.PERMISSION_CREATE_SUCCESS,
    message: PermissionMessage.PERMISSION_CREATE_SUCCESS,
    statusCode: 201,
  };

  static readonly UPDATE_SUCCESS = {
    code: PermissionCode.PERMISSION_UPDATE_SUCCESS,
    message: PermissionMessage.PERMISSION_UPDATE_SUCCESS,
    statusCode: 200,
  };

  static readonly DELETE_SUCCESS = {
    code: PermissionCode.PERMISSION_DELETE_SUCCESS,
    message: PermissionMessage.PERMISSION_DELETE_SUCCESS,
    statusCode: 204,
  };
}

