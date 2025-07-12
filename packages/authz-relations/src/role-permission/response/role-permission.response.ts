import { RolePermissionCode } from '../codes/index.js';
import { RolePermissionMessage } from '../messages/index.js';

export class RolePermissionResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ASSIGN_SUCCESS = {
    code: RolePermissionCode.ASSIGN_SUCCESS,
    message: RolePermissionMessage.ASSIGN_SUCCESS,
    statusCode: 201,
  };

  static readonly REVOKE_SUCCESS = {
    code: RolePermissionCode.REVOKE_SUCCESS,
    message: RolePermissionMessage.REVOKE_SUCCESS,
    statusCode: 204,
  };

  static readonly ASSIGN_MULTIPLE_SUCCESS = {
    code: RolePermissionCode.ASSIGN_MULTIPLE_SUCCESS,
    message: RolePermissionMessage.ASSIGN_MULTIPLE_SUCCESS,
    statusCode: 201,
  };

  static readonly REVOKE_MULTIPLE_SUCCESS = {
    code: RolePermissionCode.REVOKE_MULTIPLE_SUCCESS,
    message: RolePermissionMessage.REVOKE_MULTIPLE_SUCCESS,
    statusCode: 204,
  };

  static readonly REPLACE_SUCCESS = {
    code: RolePermissionCode.REPLACE_SUCCESS,
    message: RolePermissionMessage.REPLACE_SUCCESS,
    statusCode: 200,
  };

  static readonly FETCH_SUCCESS = {
    code: RolePermissionCode.FETCH_SUCCESS,
    message: RolePermissionMessage.FETCH_SUCCESS,
    statusCode: 200,
  };
}