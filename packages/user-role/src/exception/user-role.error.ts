import { UserRoleCode } from '../codes/index.js';
import { UserRoleMessage } from '../messages/index.js';

export class UserRoleError {
  /**  =============================================================================
   *
   *        000 ~ 099	서버 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ASSIGN_ERROR = {
    code: UserRoleCode.ASSIGN_ERROR,
    message: UserRoleMessage.ASSIGN_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ERROR = {
    code: UserRoleCode.REVOKE_ERROR,
    message: UserRoleMessage.REVOKE_ERROR,
    statusCode: 500,
  };

  static readonly ASSIGN_MULTIPLE_ERROR = {
    code: UserRoleCode.ASSIGN_MULTIPLE_ERROR,
    message: UserRoleMessage.ASSIGN_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_MULTIPLE_ERROR = {
    code: UserRoleCode.REVOKE_MULTIPLE_ERROR,
    message: UserRoleMessage.REVOKE_MULTIPLE_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ALL_FROM_USER_ERROR = {
    code: UserRoleCode.REVOKE_ALL_FROM_USER_ERROR,
    message: UserRoleMessage.REVOKE_ALL_FROM_USER_ERROR,
    statusCode: 500,
  };

  static readonly REVOKE_ALL_FROM_ROLE_ERROR = {
    code: UserRoleCode.REVOKE_ALL_FROM_ROLE_ERROR,
    message: UserRoleMessage.REVOKE_ALL_FROM_ROLE_ERROR,
    statusCode: 500,
  };

  static readonly REPLACE_ERROR = {
    code: UserRoleCode.REPLACE_ERROR,
    message: UserRoleMessage.REPLACE_ERROR,
    statusCode: 500,
  };

  static readonly FETCH_ERROR = {
    code: UserRoleCode.FETCH_ERROR,
    message: UserRoleMessage.FETCH_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 관계 조회 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly USER_ROLE_NOT_FOUND = {
    code: UserRoleCode.USER_ROLE_NOT_FOUND,
    message: UserRoleMessage.USER_ROLE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly USER_NOT_FOUND = {
    code: UserRoleCode.USER_NOT_FOUND,
    message: UserRoleMessage.USER_NOT_FOUND,
    statusCode: 404,
  };

  static readonly ROLE_NOT_FOUND = {
    code: UserRoleCode.ROLE_NOT_FOUND,
    message: UserRoleMessage.ROLE_NOT_FOUND,
    statusCode: 404,
  };

  /**  =============================================================================
   *
   *        200 ~ 299 관계 할당 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly USER_ROLE_ALREADY_EXISTS = {
    code: UserRoleCode.USER_ROLE_ALREADY_EXISTS,
    message: UserRoleMessage.USER_ROLE_ALREADY_EXISTS,
    statusCode: 409,
  };

  static readonly INVALID_USER_ROLE_RELATION = {
    code: UserRoleCode.INVALID_USER_ROLE_RELATION,
    message: UserRoleMessage.INVALID_USER_ROLE_RELATION,
    statusCode: 400,
  };

  /**  =============================================================================
   *
   *        300 ~ 399 배치 처리 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly BULK_OPERATION_PARTIAL_FAILURE = {
    code: UserRoleCode.BULK_OPERATION_PARTIAL_FAILURE,
    message: UserRoleMessage.BULK_OPERATION_PARTIAL_FAILURE,
    statusCode: 207, // Multi-Status
  };

  static readonly BULK_OPERATION_VALIDATION_FAILED = {
    code: UserRoleCode.BULK_OPERATION_VALIDATION_FAILED,
    message: UserRoleMessage.BULK_OPERATION_VALIDATION_FAILED,
    statusCode: 400,
  };
}