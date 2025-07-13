import { RolePermissionCode } from '../codes/index.js';
import { RolePermissionMessage } from '../messages/index.js';

export class RolePermissionError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ASSIGN_ERROR = {
    code: RolePermissionCode.ASSIGN_ERROR,
    message: RolePermissionMessage.ASSIGN_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ERROR = {
    code: RolePermissionCode.REVOKE_ERROR,
    message: RolePermissionMessage.REVOKE_ERROR,
    statusCode: 500,
  };

  static readonly ASSIGN_MULTIPLE_ERROR = {
    code: RolePermissionCode.ASSIGN_MULTIPLE_ERROR,
    message: RolePermissionMessage.ASSIGN_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_MULTIPLE_ERROR = {
    code: RolePermissionCode.REVOKE_MULTIPLE_ERROR,
    message: RolePermissionMessage.REVOKE_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REPLACE_ERROR = {
    code: RolePermissionCode.REPLACE_ERROR,
    message: RolePermissionMessage.REPLACE_ERROR,
    statusCode: 500,
  };

  static readonly FETCH_ERROR = {
    code: RolePermissionCode.FETCH_ERROR,
    message: RolePermissionMessage.FETCH_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ALREADY_ASSIGNED = {
    code: RolePermissionCode.ALREADY_ASSIGNED,
    message: RolePermissionMessage.ALREADY_ASSIGNED,
    statusCode: 409,
  };

  static readonly NOT_ASSIGNED = {
    code: RolePermissionCode.NOT_ASSIGNED,
    message: RolePermissionMessage.NOT_ASSIGNED,
    statusCode: 404,
  };

  static readonly INVALID_ROLE = {
    code: RolePermissionCode.INVALID_ROLE,
    message: RolePermissionMessage.INVALID_ROLE,
    statusCode: 400,
  };

  static readonly INVALID_PERMISSION = {
    code: RolePermissionCode.INVALID_PERMISSION,
    message: RolePermissionMessage.INVALID_PERMISSION,
    statusCode: 400,
  };
}