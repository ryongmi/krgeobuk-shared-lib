import { RolePermissionCode } from '../codes/index.js';
import { RolePermissionMessage } from '../messages/index.js';

export class RolePermissionError {
  /**  =============================================================================
   *
   *        000 ~ 099	서버 에러 코드
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
   *        100 ~ 199 관계 조회 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ROLE_PERMISSION_NOT_FOUND = {
    code: RolePermissionCode.ROLE_PERMISSION_NOT_FOUND,
    message: RolePermissionMessage.ROLE_PERMISSION_NOT_FOUND,
    statusCode: 404,
  };

  static readonly ROLE_NOT_FOUND = {
    code: RolePermissionCode.ROLE_NOT_FOUND,
    message: RolePermissionMessage.ROLE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly PERMISSION_NOT_FOUND = {
    code: RolePermissionCode.PERMISSION_NOT_FOUND,
    message: RolePermissionMessage.PERMISSION_NOT_FOUND,
    statusCode: 404,
  };

  /**  =============================================================================
   *
   *        200 ~ 299 관계 할당 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ROLE_PERMISSION_ALREADY_EXISTS = {
    code: RolePermissionCode.ROLE_PERMISSION_ALREADY_EXISTS,
    message: RolePermissionMessage.ROLE_PERMISSION_ALREADY_EXISTS,
    statusCode: 409,
  };

  static readonly INVALID_ROLE_PERMISSION_RELATION = {
    code: RolePermissionCode.INVALID_ROLE_PERMISSION_RELATION,
    message: RolePermissionMessage.INVALID_ROLE_PERMISSION_RELATION,
    statusCode: 400,
  };

  /**  =============================================================================
   *
   *        300 ~ 399 배치 처리 에러 코드
   *
   *
   *   =============================================================================
   */
  /** */

  static readonly BULK_OPERATION_PARTIAL_FAILURE = {
    code: RolePermissionCode.BULK_OPERATION_PARTIAL_FAILURE,
    message: RolePermissionMessage.BULK_OPERATION_PARTIAL_FAILURE,
    statusCode: 207, // Multi-Status
  };

  static readonly BULK_OPERATION_VALIDATION_FAILED = {
    code: RolePermissionCode.BULK_OPERATION_VALIDATION_FAILED,
    message: RolePermissionMessage.BULK_OPERATION_VALIDATION_FAILED,
    statusCode: 400,
  };
}